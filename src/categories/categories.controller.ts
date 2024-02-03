import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api')
export class CategoriesController {
    constructor(private readonly  categoriesService: CategoriesService) {} 

    @Post('categories')
    async saveEnumCategorie(){
        try {
            return this.categoriesService.saveEnumCategorie();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    @Get('categories')
    async findAll(){
        try {
            return this.categoriesService.findAll();
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
