import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString } from "class-validator"
import { ArticleDto } from "src/articles/dto/article.dto"
import { CreateUserDto } from "src/auth/dto/create-user.dto"

export class CommentDto{
    @ApiProperty()
    @IsNumber()
    idComments:number

    @ApiProperty()
    @IsString()
    contents:string

    @ApiProperty()
    @IsDate()
    createAt:Date

    @ApiProperty()
    @IsNotEmptyObject()
    idUser:CreateUserDto
    
    @ApiProperty()  
    @IsNotEmptyObject()
    articles:ArticleDto
}