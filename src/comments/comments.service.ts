import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entities';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/commentDto';
import { Articles } from 'src/articles/entities/articles.entities';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private readonly comment: Repository<Comments>,
    @InjectRepository(Articles) private readonly articles: Repository<Articles>,
  ) {}

  async createComment(idArticle:number, commentDto: CommentDto) {
    const article = await this.articles.findOne({where:{idArticles:idArticle}});
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    commentDto.articles = article;
    const newComment = this.comment.create(commentDto);
    await this.comment.save(newComment);
    return newComment;
  }

  async findByIdComments(id:number){
    return await this.comment.findOne({where:{idComments:id}});
  }
}
