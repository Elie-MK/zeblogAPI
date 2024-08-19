import { ArticleDto } from 'src/articles/dto/article.dto';
import { UserDto } from 'src/auth/dto/user.dto';

export class FavoriteArticleDTO {
  idFavoriteArticle: number;
  user: UserDto;
  article: ArticleDto;
}
