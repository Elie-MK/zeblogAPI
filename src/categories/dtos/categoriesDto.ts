import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ArticleDto } from "src/articles/dto/article.dto"
import { CategorieEnum } from "../enum/categorieEnum"

export class CategoriesDto {
    @IsNumber()
    idCat:number

    @IsString()
    name:CategorieEnum

    @IsNotEmpty()
    articles:ArticleDto
}

