import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { CommentDto } from "src/comments/dto/commentDto";
import { LikeEnum } from "src/likes/entities/likes.entity";
import { CategorieEnum } from "../Enums/CategorieEnum";
import { ApiProperty } from "@nestjs/swagger";

export class ArticleDto {
    @ApiProperty()
    @IsNumber()
    idArticles

    @ApiProperty()
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    Title:string

    @ApiProperty()
    @IsString()
    @MinLength(50)
    @IsNotEmpty()
    Content:string

    @ApiProperty()
    @IsNotEmpty()
    user:CreateUserDto

    @ApiProperty()
    @IsArray()
    comments:CommentDto[]

    @ApiProperty()
    @IsString()
    pictures:string
    
    @ApiProperty()
    category:CategorieEnum
}
