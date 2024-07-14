import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { likeDto } from './dtos/likeDto';
import { ApiTags } from '@nestjs/swagger';
import { IRequestUser } from 'src/shared/IRequestUser';

@ApiTags('Likes')
@Controller('api')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @Post('createLike/:idArticle')
  async createLike(
    @Param('idArticle', ParseIntPipe) idArticle: number,
    @Request() req,
    @Body() LikeDto: likeDto,
  ) {
    try {
      return await this.likesService.addLike(idArticle, req.user, LikeDto);
    } catch (error) {
      console.log(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Put('changeLike/:idArticles')
  async changeLike(
    @Param('idArticles', ParseIntPipe) idArticles: number,
    @Request() req,
    @Body() LikeDto: likeDto,
  ) {
    try {
      return await this.likesService.modifyLike(idArticles, req.user, LikeDto);
    } catch (error) {
      console.log(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/deleteLike/:idArticle')
  async deleteLike(
    @Param('idArticle', ParseIntPipe) idArticle: number,
    @Request() req: IRequestUser,
  ) {
    try {
      return await this.likesService.deleteLikeByUser(idArticle, req);
    } catch (error) {
      console.log(error.message);
    }
  }
}
