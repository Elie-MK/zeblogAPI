import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { Articles } from './articles/entities/articles.entities';
import { Comments } from './comments/entities/comments.entities';
import { LikesModule } from './likes/likes.module';
import { Likes } from './likes/entities/likes.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      port: 5432,
      password: 'kinshasa',
      database: 'zeblog',
      entities: [Users, Articles, Comments, Likes],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ArticlesModule,
    CommentsModule,
    LikesModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
