import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/commentDto';
import { Articles } from 'src/articles/entities/articles.entity';

@Injectable()
export class CommentsService {
  log = new Logger();
  constructor(
    @InjectRepository(Comments) private readonly comment: Repository<Comments>,
    @InjectRepository(Articles) private readonly articles: Repository<Articles>,
  ) {}

  async createComment(idArticles: number, commentDto: CommentDto) {
    this.log.debug('Response ', commentDto);
    try {
      const article = await this.articles.findOne({
        where: { idArticles: idArticles },
      });
      if (!article) {
        throw new BadRequestException('Article not found ');
      }
      commentDto.articles = article;
      commentDto.articleId = article.idArticles;
      const newComment = this.comment.create(commentDto);
      await this.comment.save(newComment);
      return newComment;
    } catch (error) {
      this.log.debug('Error found', error);
    }
  }

  async findByIdComments(id: number) {
    return await this.comment.findOne({ where: { idComments: id } });
  }

  async findCommentsByArticle(articleId: number) {
    try {
      const comments = await this.comment.find({
        where: { articleId: articleId },
        relations: ['user'],
      });
      if (comments) {
        const data = comments.map(({ user, ...rest }) => ({
          ...rest,
          user: {
            idUser: user.idUser,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            pictureProfile: user.pictureProfile,
            createAt: user.createAt,
          },
        }));
        return data;
      }
    } catch (error) {
      this.log.debug('Error occured', error);
    }
  }
}
