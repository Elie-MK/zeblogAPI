import { IsNumber } from "class-validator";
import { LikeEnum } from "../entities/likes.entity";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { ArticleDto } from "src/articles/dto/article.dto";

export class likeDto {
    @IsNumber()
    idLike: number;

    @IsNumber()
    idUser: CreateUserDto;

    @IsNumber()
    idArticles: ArticleDto;
    
    likeStatus: LikeEnum;
}