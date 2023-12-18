import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categoriesDto } from './dto/categories.dto';

@Controller('api/')
export class CategoriesController {
    constructor(private readonly categorieService:CategoriesService ){}


    @Post('categories')
    async createCategory(@Body() categorieDto:categoriesDto){
        
        
        return await this.categorieService.createCategory(categorieDto)
    }
}
