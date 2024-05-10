import { ApiProperty } from "@nestjs/swagger"
import { IsDate,  IsNotEmptyObject, IsNumber, IsString } from "class-validator"
import { ArticleDto } from "src/articles/dto/article.dto"
import { UserDto } from "src/auth/dto/user.dto"

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
    idUser:UserDto
    
    @ApiProperty()  
    @IsNotEmptyObject()
    articles:ArticleDto
}