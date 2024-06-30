import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ArticleDto } from './dto/article.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Articles')
@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('pictures'))
  @Post('/create')
  async createArticle(
    @Body() articleDto: ArticleDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    articleDto.user = req.user;
    return await this.articleService.createArticle(articleDto, file);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async modifyArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() articleDto: ArticleDto,
    @Request() req,
  ) {
    const user = req.user;
    return await this.articleService.modifyArticle(id, articleDto, user);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteArticle(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const user = req.user;
    return await this.articleService.deleteArticle(id, user);
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  async findAllArticle() {
    return this.articleService.findAllArticlesWithUsers();
  }

  @UseGuards(AuthGuard)
  @Get('/category')
  async findByCategory() {
    return await this.articleService.findArticleByCategory();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findArticleById(@Param('id', ParseIntPipe) id: number) {
    return await this.articleService.findArticleById(id);
  }

  @UseGuards(AuthGuard)
  @Get('/user/articles')
  async findArticleByUser(@Request() req) {
    const user = req.user;
    return await this.articleService.findArticleByUser(user);
  }

  // @UseGuards(AuthGuard)
  // @Get('articles/comments/:id')
  // async findArticleByIdWithComments(@Param('id', ParseIntPipe) id:number){
  //     return await this.articleService.findArticleByIdWithComments(id)
  // }
}
