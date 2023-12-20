import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ArticleDto } from './dto/article.dto';

@Controller('api')
export class ArticlesController {
    constructor(private readonly articleService:ArticlesService){}

    @UseGuards(AuthGuard)
    @Post('articles')
    async createArticle(@Body() articleDto:ArticleDto, @Request() req){
        console.log(req.user);
        
        articleDto.user= req.user
        return await this.articleService.createArticle(articleDto)
    }
}
