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
 
    const article = this.articlesRepository.create(
     articleDto
    );
    await this.articlesRepository.save(article);
    return article;
  }

  async findAllArticlesWithUsers() {
    const articleWithUser = await this.articlesRepository.find({
      relations: ['user', 'comments', 'likes'],
    });

    if (articleWithUser) {
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
        }));
        return articleWithUser;
      } else {
        throw new BadRequestException('Article not found');
      }
    } catch (error) {
      throw new UnauthorizedException('You are not authorize for this action');
    }
  }

  async findArticleById(id: number) {
    const article = await this.articlesRepository.findOne({
      where: { idArticles: id },
      relations: ['user', 'comments', 'likes'],
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
  }

  // async findArticleByIdWithComments (id: number){
  //   try {
  //     const article = await this.articlesRepository.findOne({
  //       where: { idArticles: id },
  //       relations: ['comment'],
  //     });

  //     return article
  //   } catch (error) {

  //   }
  // }

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
