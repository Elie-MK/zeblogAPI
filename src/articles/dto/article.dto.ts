import { IsArray, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { Categories } from "src/categories/entities/categories.entities";

export class ArticleDto {

    @IsString()
    @MinLength(5)
    Title:string

    @IsString()
    @MinLength(50)
    Content:string

    @IsArray()
    cats: any[]

    @IsNotEmpty()
    user:CreateUserDto

    @IsArray()
    comments:any[]

    @IsString()
    pictures:string
}