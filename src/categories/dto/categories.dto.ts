import { IsString } from "class-validator"

export class categoriesDto {
    idCat:number

    @IsString()
    nameCat:string
}