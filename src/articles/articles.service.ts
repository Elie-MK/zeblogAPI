import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from './entities/articles.entities';
import { Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(Articles) private readonly articlesRepository:Repository<Articles> ){}

    async createArticle(articleDto: ArticleDto){
        
        // articleDto.user =  req.user.id
        const article =  this.articlesRepository.create(articleDto)
        await this.articlesRepository.save(article)
        return article
    }
}
