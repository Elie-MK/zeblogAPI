/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZohoOAuthToken } from './entity/zoho.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IZohoResponse } from '../shared/IResponse';
import { UserDto } from 'src/auth/dto/user.dto';
import { addMilliseconds, isBefore, subMinutes } from 'date-fns';

@Injectable()
export class ZohoService {
  log = new Logger();

  constructor(
    @InjectRepository(ZohoOAuthToken)
    private readonly zohoAuthRepository: Repository<ZohoOAuthToken>,
    private readonly configService: ConfigService,
  ) {}

  async generateRefreshZohoToken() {
    try {
      const findRefresh = await this.zohoAuthRepository.findOne({
        where: { id: 2 },
      });
      if (findRefresh) {
        this.log.debug('Refresh token found', findRefresh);
        const body = {
          refresh_token: findRefresh.refresh_token,
          client_id: findRefresh.client_id,
          client_secret: findRefresh.client_secret,
          grant_type: 'refresh_token',
        };
        const response = await fetch(
          'https://accounts.zoho.com/oauth/v2/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(body).toString(),
          },
        );
        if (!response.ok) {
          this.log.error('Failed to fetch Zoho token', response.statusText);
          throw new Error(`Failed to fetch Zoho token: ${response.statusText}`);
        }

        const data: IZohoResponse = await response.json();
        this.log.debug('Zoho token ', data);

        const updatedData = await this.zohoAuthRepository.update(
          { id: findRefresh.id },
          {
            grant_token: body.grant_type,
            access_token: data.access_token,
            expiry_time: data.expires_in,
            createAt: new Date(),
          },
        );
        this.log.debug('Zoho data updated', updatedData);
        return { data, updatedData };
      }
    } catch (error) {
      this.log.error('Error while generating zoho token ', error);
    }
  }

  async generateZohoToken() {
    try {
      const findRefresh = await this.zohoAuthRepository.findOne({
        where: { refresh_token: null },
      });

      if (findRefresh === null) {
        this.log.error('No refresh token found');

        const body = {
          client_id: this.configService.get<string>('ZOHO_CLIENT_ID'),
          client_secret: this.configService.get<string>('ZOHO_CLIENT_SECRET'),
          code: this.configService.get<string>('ZOHO_CODE'),
          grant_type: 'authorization_code',
        };

        const response = await fetch(
          'https://accounts.zoho.com/oauth/v2/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(body).toString(),
          },
        );

        if (!response.ok) {
          this.log.error('Failed to fetch Zoho token', response.statusText);
          throw new Error(`Failed to fetch Zoho token: ${response.statusText}`);
        }
        const data: IZohoResponse = await response.json();
        this.log.debug('Zoho token', data);
        const dataTokenSave = await this.zohoAuthRepository.save({
          client_secret: body.client_secret,
          client_id: body.client_id,
          refresh_token: data.refresh_token,
          access_token: data.access_token,
          expiry_time: data.expires_in,
          grant_token: body.grant_type,
        });
        this.log.debug('Zoho data save', dataTokenSave);

        return { data, dataTokenSave };
      } else {
        this.log.debug('Refresh token already exists');
        return null;
      }
    } catch (error) {
      this.log.error('Error generating Zoho token', error);
      throw error;
    }
  }

  async createNewLead({ email, fullName }: UserDto) {
    try {
      const findToken = await this.zohoAuthRepository.findOne({
        where: { id: 1 },
      });
      let token_access: string;
      if (
        findToken &&
        this.isTokenExpired(findToken.createAt, findToken.expiry_time)
      ) {
        this.log.debug('Token expired, generating new token ');
        const { data } = await this.generateRefreshZohoToken();
        this.log.debug(
          'Token refreshed, generating new token ',
          data.access_token,
        );

        token_access = data.access_token;
      } else {
        const { data } = await this.generateZohoToken();
        this.log.debug('Token generated', data);
        token_access = data.access_token;
      }
      const body = {
        data: [
          {
            Last_Name: fullName,
            Email: email,
          },
        ],
      };
      const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Zoho-oauthtoken ${token_access}`,
        },
        body: JSON.stringify(body).toString(),
      });
      if (!response.ok) {
        this.log.error('Failed to create new lead', response.statusText);
      }
      const data = await response.json();
      this.log.debug('New lead created', data);
      return data;
    } catch (error) {
      this.log.error('Error creating new lead', error);
    }
  }

  private isTokenExpired(createdAt: Date, expiresIn: number): boolean {
    const expirationTime = addMilliseconds(createdAt, expiresIn);
    const expirationTimeMinusOneMinute = subMinutes(expirationTime, 1);
    return isBefore(expirationTimeMinusOneMinute, new Date());
  }
}
