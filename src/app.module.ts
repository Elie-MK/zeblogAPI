import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { UploadModule } from './upload/upload.module';
import { ZohoModule } from './zoho/zoho.module';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    ArticlesModule,
    CommentsModule,
    LikesModule,
    UploadModule,
    ZohoModule,
  ],
})
export class AppModule {}
