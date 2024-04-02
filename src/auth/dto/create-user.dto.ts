import { Exclude } from 'class-transformer';
import {
  IsAlphanumeric,
  IsArray,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ArticleDto } from 'src/articles/dto/article.dto';
import { GenderEnum } from '../entities/user.entity';
import { LikeEnum } from 'src/likes/entities/likes.entity';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsInt()
  idUser: number;
  
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  fullName: string;
  
  @IsDate()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  countryName: string;

  @IsString()
  streetAdress: string;

  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsNotEmpty()
  @IsAlphanumeric(null, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
  })
  password: string;

  @IsString()
  pictureProfile: string;

  @IsString()
  gender:GenderEnum

  @IsArray()
  articles: ArticleDto[];

  @IsDate()
  createAt: Date;

}
