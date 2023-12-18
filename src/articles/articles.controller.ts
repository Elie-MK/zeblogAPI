import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ArticleDto } from './dto/article.dto';

@Controller('api')
export class ArticlesController {
    constructor(private readonly articleService:ArticlesService){}

    @UseGuards(AuthGuard)
    @Post('articles')
    async createArticle(@Body() articleDto:ArticleDto){
        return await this.articleService.createArticle(articleDto)
    }
}
