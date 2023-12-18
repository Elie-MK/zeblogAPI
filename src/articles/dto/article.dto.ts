import { IsString, MinLength } from "class-validator";

export class ArticleDto {

    @IsString()
    @MinLength(5)
    Title:string

    @IsString()
    @MinLength(50)
    Content:string

    @IsString()
    Cat:string

    @IsString()
    pictures:string
}