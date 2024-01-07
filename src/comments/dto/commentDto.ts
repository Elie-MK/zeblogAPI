import { IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString } from "class-validator"
import { ArticleDto } from "src/articles/dto/article.dto"
import { CreateUserDto } from "src/auth/dto/create-user.dto"

export class CommentDto{
    @IsNumber()
    idComments:number

    @IsString()
    contents:string

    @IsDate()
    createAt:Date

    @IsNotEmptyObject()
    idUser:CreateUserDto

    @IsNotEmptyObject()
    articles:ArticleDto
}