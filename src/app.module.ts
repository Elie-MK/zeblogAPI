import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UploadModule } from './upload/upload.module';
import { ZohoModule } from './zoho/zoho.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({ isGlobal: true }),
    ArticlesModule,
    CommentsModule,
    LikesModule,
    UploadModule,
    ZohoModule,
  ],
})
export class AppModule {}
