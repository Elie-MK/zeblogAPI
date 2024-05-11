import { IsNumber } from 'class-validator';
import { UserDto } from 'src/auth/dto/user.dto';
import { ArticleDto } from 'src/articles/dto/article.dto';
import { ApiProperty } from '@nestjs/swagger';
import { LikeEnum } from 'src/shared/Enums/likeEnum';

export class likeDto {
  @ApiProperty()
  @IsNumber()
  idLike: number;

  @ApiProperty()
  @IsNumber()
  idUser: UserDto;

  @ApiProperty()
  @IsNumber()
  idArticles: ArticleDto;

  @ApiProperty()
  likeStatus: LikeEnum;
}
