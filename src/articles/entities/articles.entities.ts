import { Users } from 'src/auth/entities/user.entity';
import { Categories } from 'src/categories/entities/categories.entities';
import { Comments } from 'src/comments/entities/comments.entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  Cat: string;

  @Column({type:'varchar'})
  pictures:string

  @ManyToOne(() => Users, (user) => user.articles)
  @JoinColumn({ name: 'idUser' }) 
  user: Users;

  @OneToMany(() => Comments, (com) => com.articles)
  @JoinColumn({ name: 'idComments' }) 
  comments: Comments[];

  @ManyToMany(()=>Categories, (cat) => cat)
  cats:Categories[]
}
