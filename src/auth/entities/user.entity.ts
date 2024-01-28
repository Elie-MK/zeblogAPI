import { Exclude } from 'class-transformer';
import { Articles } from 'src/articles/entities/articles.entities';
import { Comments } from 'src/comments/entities/comments.entities';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ type: 'varchar', length: 25, unique:true })
  username: string;

  @Column({ type: 'varchar', length: 25, unique:true })
  email: string;

  @Column({ type: 'varchar'})
  password: string;

  @Column({ type: 'varchar'})
  gender: string;

  @Column({ type: 'varchar', nullable:false  })
  pictureProfile: string;
  
  @Column({ type:'timestamp', default:()=>'CURRENT_TIMESTAMP' })
  createAt: Date;

  @OneToMany(()=>Articles, art => art.user)
  @JoinColumn({name:'idArticles'})
  articles:Articles[]

  @OneToMany(()=>Comments, com => com.idUser)
  @JoinColumn({name:'idUser'})
  comments:Comments[]

}
