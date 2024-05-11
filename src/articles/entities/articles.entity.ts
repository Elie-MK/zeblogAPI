import { Users } from 'src/auth/entities/user.entity';
import { Comments } from 'src/comments/entities/comments.entity';
import { Likes } from 'src/likes/entities/likes.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategorieEnum } from '../../shared/Enums/categorieEnum';

@Entity({ name: 'article' })
export class Articles {
  @PrimaryGeneratedColumn()
  idArticles: number;

  @Column({ type: 'varchar' })
  Title: string;

  @Column({ type: 'varchar' })
  Content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreateAt: Date;

  @Column({ type: 'varchar' })
  pictures: string;

  @ManyToOne(() => Users, (user) => user.articles)
  user: Users;

  @OneToMany(() => Comments, (com) => com.articles)
  comments: Comments[];

  @Column({ type: 'enum', enum: CategorieEnum, default: CategorieEnum.NONE })
  category: CategorieEnum;

  @OneToMany(() => Likes, (like) => like.article)
  likes: Likes[];
}
