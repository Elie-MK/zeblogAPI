import { Users } from 'src/auth/entities/user.entity';
import { Comments } from 'src/comments/entities/comments.entities';
import { LikeEnum, Likes } from 'src/likes/entities/likes.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategorieEnum } from '../Enums/CategorieEnum';


@Entity()
export class Articles {
  @PrimaryGeneratedColumn()
  idArticles: number;

  @Column({type:'varchar'})
  Title: string;

  @Column({type:'varchar'})
  Content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreateAt: Date;

  @Column({type:'varchar'})
  pictures:string

  @ManyToOne(() => Users, (user) => user.articles)
  user: Users;

  @OneToMany(() => Comments, (com) => com.articles)
  comments: Comments[];

  @Column({type:"enum", enum:CategorieEnum, default:CategorieEnum.NONE})
  category:CategorieEnum

  @OneToMany(()=>Likes, (like) => like.article)
  likes : Likes[]
}
