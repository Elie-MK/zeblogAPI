import { ApiProperty } from '@nestjs/swagger';
import { Articles } from 'src/articles/entities/articles.entity';
import { Comments } from 'src/comments/entities/comments.entity';
import { Likes } from 'src/likes/entities/likes.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
  NONE = "none"
}

@Entity()
export class Users {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  idUser: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 25, unique:true,nullable:false })
  fullName: string;

  @ApiProperty()
  @Column({ type: 'timestamp',})
  dateOfBirth: Date;

  @ApiProperty()
  @Column({ type: 'varchar', length: 25, unique:true,nullable:false })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 25, unique:true,nullable:false })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 25, nullable:false })
  countryName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 25, })
  streetAdress: string;

  @ApiProperty()
  @Column({ type: 'varchar',nullable:false})
  password: string;

  @ApiProperty()
  @Column({ type: "enum", enum: GenderEnum, default:GenderEnum.NONE })
  gender: GenderEnum;

  @ApiProperty()
  @Column({ type: 'varchar', nullable:false  })
  pictureProfile: string;
  
  @ApiProperty()
  @Column({ type:'timestamp', default:()=>'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ApiProperty()
  @OneToMany(()=>Articles, art => art.user)
  articles:Articles[]

  @ApiProperty()
  @OneToMany(()=>Comments, com => com.idUser)
  comments:Comments[]

  @ApiProperty()
  @OneToMany(()=>Likes, like => like.user)
  likes:Likes[]
}
