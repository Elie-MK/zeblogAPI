import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './entities/articles.entity';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  controllers: [ArticlesController],
  providers: [ArticlesService, UploadService],
})
export class ArticlesModule {}
