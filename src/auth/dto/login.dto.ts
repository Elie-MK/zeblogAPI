import {
  IsAlphanumeric,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../Enums/genderEnum';
import { RoleEnum } from '../Enums/roleEnum';

export class LoginDto {
  @ApiProperty()
  @IsInt()
  idUser: number;

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
  @IsString()
  gender: GenderEnum;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  pictureProfile: string;

  @ApiProperty()
  @IsString()
  role: RoleEnum;
}
