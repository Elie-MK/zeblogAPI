import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from './entities/articles.entities';
import { Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
  ) {}

  async createArticle(articleDto: ArticleDto) {
    try {
      const article = this.articlesRepository.create(articleDto);
      await this.articlesRepository.save(article);
      return article;
    } catch (error) {
      throw new BadRequestException('Error article not publish');
    }
  }
  async findAllArticlesWithUsers() {
    try {
      const articleWithUser = await this.articlesRepository.find({
        relations: ['user'],
      });

      const dataUser = articleWithUser.map(({ user, ...rest }) => ({
        ...rest,
        user: {
          idUser: user.idUser,
          username: user.username,
          email: user.email,
          pictureProfile: user.pictureProfile,
          createAt: user.createAt,
        },
      }));

      return dataUser;
    } catch (error) {
      throw new NotFoundException('Articles not found');
    }
  }

  async findArticleByUser(req) {
    try {
      const article = await this.articlesRepository.find({
        relations: ['user'],
      });

      const articleByUser = article.filter(
        (data) => data.user.idUser === req.idUser,
      );

      if (articleByUser) {
        const articleWithUser = articleByUser.map(({ user, ...rest }) => ({
          ...rest,
          user: {
            idUser: user.idUser,
            username: user.username,
            email: user.email,
            pictureProfile: user.pictureProfile,
            createAt: user.createAt,
          },
        }))
        return articleWithUser;
      } else {
        throw new BadRequestException('Article not found');
      }
    } catch (error) {
      throw new UnauthorizedException('You are not authorize for this action');
    }
  }

  async findArticleById(id: number) {
    try {
      const article = await this.articlesRepository.findOne({
        where: { idArticles: id },
        relations: ['user'],
      });
      if (article) {
        const data = {
          ...article,
          user: {
            idUser: article.user.idUser,
            username: article.user.username,
            email: article.user.email,
            pictureProfile: article.user.pictureProfile,
            createAt: article.user.createAt,
          },
        };
        return data;
      } else {
        throw new BadRequestException('Article not found');
      }
    } catch (error) {
      throw new NotFoundException('Article not found');
    }
  }

  async modifyArticle(id: number, articleDto: ArticleDto, req) {
    const article = await this.articlesRepository.findOne({
      where: { idArticles: id },
      relations: ['user'],
    });

    if (article.user.idUser === req.idUser) {
      if (article) {
        await this.articlesRepository.update(id, articleDto);
        return await this.articlesRepository.findOne({
          where: { idArticles: id },
        });
      } else {
        throw new BadRequestException('Article not found');
      }
    } else {
      throw new BadRequestException(
        'You dont have permission to modify this article',
      );
    }
  }
  async deleteArticle(id: number, req) {
    const article = await this.articlesRepository.findOne({
      where: { idArticles: id },
      relations: ['user'],
    });

    if (article.user.idUser === req.idUser) {
      if (article) {
        await this.articlesRepository.delete(id);
        return { message: `The article with id ${id} was delete successfully` };
      } else {
        throw new BadRequestException('Article not found');
      }
    } else {
      throw new BadRequestException(
        'You dont have permission to delete this article',
      );
    }
  }
}
