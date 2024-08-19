import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoriteArticleService } from './favorite-article.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('api/favorite-article')
export class FavoriteArticleController {
  constructor(
    private readonly favoriteArticleService: FavoriteArticleService,
  ) {}

  @UseGuards(AuthGuard)
  @Post(':articleId')
  async setFavoriteArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Request() req,
  ) {
    const userId = req.user.idUser;
    return this.favoriteArticleService.createFavoriteArticle(userId, articleId);
  }
}
