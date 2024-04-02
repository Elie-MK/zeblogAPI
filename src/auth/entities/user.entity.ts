import { Articles } from 'src/articles/entities/articles.entities';
import { Comments } from 'src/comments/entities/comments.entities';
import { Likes } from 'src/likes/entities/likes.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, JoinColumn } from 'typeorm';

export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
  NONE = "none"
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ type: 'varchar', length: 25, unique:true,nullable:false })
  fullName: string;

  @Column({ type: 'timestamp',})
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 25, unique:true,nullable:false })
  username: string;

  @Column({ type: 'varchar', length: 25, unique:true,nullable:false })
  email: string;

  @Column({ type: 'varchar', length: 25, nullable:false })
  countryName: string;

  @Column({ type: 'varchar', length: 25, })
  streetAdress: string;

  @Column({ type: 'varchar',nullable:false})
  password: string;

  @Column({ type: "enum", enum: GenderEnum, default:GenderEnum.NONE })
  gender: GenderEnum;

  @Column({ type: 'varchar', nullable:false  })
  pictureProfile: string;
  
  @Column({ type:'timestamp', default:()=>'CURRENT_TIMESTAMP' })
  createAt: Date;

  @OneToMany(()=>Articles, art => art.user)
  articles:Articles[]

  @OneToMany(()=>Comments, com => com.idUser)
  comments:Comments[]

  @OneToMany(()=>Likes, like => like.user)
  likes:Likes[]
}
