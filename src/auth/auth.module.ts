import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UploadService } from 'src/upload/upload.service';
import { ZohoService } from 'src/zoho/zoho.service';
import { ZohoOAuthToken } from 'src/zoho/entity/zoho.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, ZohoOAuthToken]),
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UploadService, ZohoService],
})
export class AuthModule {}
