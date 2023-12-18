import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type:'postgres',
    host:'', 
    username:'postgres',
    port:5432, 
    password:'', 
    database:'', 
    entities:[User],
    synchronize:true
  }), ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
