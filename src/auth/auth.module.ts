import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports:[TypeOrmModule.forFeature([Users]),  JwtModule.register({
    global:true, 
    secret:jwtConstants.secret
    
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
