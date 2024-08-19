import { Injectable, Logger } from '@nestjs/common';
import { favoriteArticle } from './entities/favoriteArticle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articles } from 'src/articles/entities/articles.entity';

@Injectable()
export class FavoriteArticleService {
  log = new Logger();
  constructor(
    @InjectRepository(favoriteArticle)
    private readonly favoriteArticleRepository: Repository<favoriteArticle>,

    @InjectRepository(Articles)
    private readonly articleRepository: Repository<Articles>,
  ) {}

  async createFavoriteArticle(userId: number, articleId: number) {
    const AlreadyFavorite = await this.favoriteArticleRepository.findOne({
      where: {
        user: { idUser: userId },
        article: { idArticles: articleId },
      },
    });

    const findArticle = await this.articleRepository.findOne({
      where: { idArticles: articleId },
    });

    if (!findArticle) {
      this.log.debug('Article not found');
      return 'Article not found';
    }

    if (AlreadyFavorite) {
      this.log.debug('Article already favorite by the same user');
      return AlreadyFavorite;
    }
    const favoriteArticle = this.favoriteArticleRepository.create({
      user: { idUser: userId },
      article: { idArticles: articleId },
    });
    return await this.favoriteArticleRepository.save(favoriteArticle);
  }
}
