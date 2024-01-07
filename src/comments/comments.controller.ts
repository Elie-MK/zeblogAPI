import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentDto } from './dto/commentDto';

@Controller('api')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post('articles/comments/:idArticle')
  async createComment(
    @Param('idArticle', ParseIntPipe) articleId: number,
    @Body() commentDto: CommentDto,
    @Request() req,
  ) {
    commentDto.idUser = req.user;
    return await this.commentService.createComment(articleId, commentDto);
  }

  @UseGuards(AuthGuard)
  @Get('articles/comments/:idArticle')
  async findByIdComments(@Param('idArticle', ParseIntPipe) articleId: number) {
    return await this.commentService.findByIdComments(articleId);
  }
}
