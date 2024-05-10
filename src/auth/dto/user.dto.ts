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
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../Enums/genderEnum';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class UserDto {
  @ApiProperty()
  @IsInt()
  idUser: number;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  fullName: string;
  
  @ApiProperty()
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  countryName: string;

  @ApiProperty()
  @IsString()
  streetAdress: string;

  @ApiProperty()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsNotEmpty()
  @IsAlphanumeric(null, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number and 
        one special character`,
  })
  password: string;

  @ApiProperty()
  @IsString()
  pictureProfile: string;

  @ApiProperty()
  @IsString()
  gender:GenderEnum

  @ApiProperty()
  @IsArray()
  articles: ArticleDto[];
  
  @ApiProperty()
  @IsDate()
  createAt: Date;

}
