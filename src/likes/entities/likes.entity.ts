import { Articles } from 'src/articles/entities/articles.entity';
import { Users } from 'src/auth/entities/user.entity';
import { LikeEnum } from '../../shared/Enums/likeEnum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'likes' })
@Unique(['idUser', 'idArticles'])
export class Likes {
  @PrimaryGeneratedColumn()
  idLike: number;

  @Column({ type: 'int' })
  idUser: number;

  @Column({ type: 'int' })
  idArticles: number;

  @Column({ type: 'enum', enum: LikeEnum, default: LikeEnum.Neutral })
  likeStatus: LikeEnum;

  @ManyToOne(() => Articles, (art) => art.likes)
  @JoinColumn({ name: 'idArticles' })
  article: Articles;

  @ManyToOne(() => Users, (user) => user.likes)
  @JoinColumn({ name: 'idUser' })
  user: Users;
}
