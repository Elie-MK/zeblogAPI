import { Articles } from 'src/articles/entities/articles.entity';
import { Users } from 'src/auth/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'favorite_article' })
export class favoriteArticle {
  @PrimaryGeneratedColumn()
  idFavoriteArticle: number;

  @ManyToOne(() => Users, (user) => user.favoriteArticles)
  user: Users;

  @ManyToOne(() => Articles, (article) => article.favoriteArticles)
  article: Articles;
}
