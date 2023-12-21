import { IsArray, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { Categories } from "src/categories/entities/categories.entities";

export class ArticleDto {

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    Title:string

    @IsString()
    @MinLength(50)
    @IsNotEmpty()
    Content:string

    @IsArray()
    @IsNotEmpty()
    cats: any[]

    @IsNotEmpty()
    user:CreateUserDto

    @IsArray()
    comments:any[]

    @IsString()
    pictures:string
}