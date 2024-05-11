import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UploadService],
})
export class AuthModule {}
