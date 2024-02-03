import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './entities/articles.entities';
import { Categories } from 'src/categories/entities/categorie.entitie';

@Module({
  imports:[TypeOrmModule.forFeature([Articles, Categories])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
