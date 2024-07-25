/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ZohoService } from './zoho.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZohoOAuthToken } from './entity/zoho.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZohoOAuthToken])],
  providers: [ZohoService],
})
export class ZohoModule {}
