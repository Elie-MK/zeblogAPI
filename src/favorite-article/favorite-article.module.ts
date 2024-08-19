import { Module } from '@nestjs/common';
import { FavoriteArticleController } from './favorite-article.controller';
import { FavoriteArticleService } from './favorite-article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { favoriteArticle } from './entities/favoriteArticle.entity';
import { Articles } from 'src/articles/entities/articles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([favoriteArticle, Articles])],
  controllers: [FavoriteArticleController],
  providers: [FavoriteArticleService],
})
export class FavoriteArticleModule {}
