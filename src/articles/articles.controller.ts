import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ArticleDto } from './dto/article.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articleService:ArticlesService){}

    @UseGuards(AuthGuard)
    @Post('/create')
    async createArticle(@Body() articleDto:ArticleDto, @Request() req){
        articleDto.user= req.user
        return await this.articleService.createArticle(articleDto)
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    async modifyArticle(@Param('id', ParseIntPipe) id:number, @Body() articleDto:ArticleDto, @Request() req){
       const user = req.user
        return await this.articleService.modifyArticle(id, articleDto, user)
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async deleteArticle(@Param('id', ParseIntPipe) id:number,  @Request() req){
        const user = req.user
        return await this.articleService.deleteArticle(id, user)
    }

    @UseGuards(AuthGuard)
    @Get('/all')
    async findAllArticle(){
        return this.articleService.findAllArticlesWithUsers()
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findArticleById(@Param('id', ParseIntPipe) id:number){
        return await this.articleService.findArticleById(id)
    }
    
    @UseGuards(AuthGuard)
    @Get('/user/articles')
    async findArticleByUser(@Request() req){
        const user = req.user
        return await this.articleService.findArticleByUser(user)
    }

    // @UseGuards(AuthGuard)
    // @Get('articles/comments/:id')
    // async findArticleByIdWithComments(@Param('id', ParseIntPipe) id:number){
    //     return await this.articleService.findArticleByIdWithComments(id)
    // }
}
