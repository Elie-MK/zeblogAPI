import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { CommentDto } from "src/comments/dto/commentDto";
import { LikeEnum } from "src/likes/entities/likes.entity";
import { CategorieEnum } from "../Enums/CategorieEnum";

export class ArticleDto {
    @IsNumber()
    idArticles

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    Title:string

    @IsString()
    @MinLength(50)
    @IsNotEmpty()
    Content:string

    @IsNotEmpty()
    user:CreateUserDto

    @IsArray()
    comments:CommentDto[]

    @IsString()
    pictures:string

    category:CategorieEnum
}
