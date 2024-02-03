import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categorie.entitie';
import { Repository } from 'typeorm';
import { CategorieEnum } from './enum/categorieEnum';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private readonly categories:Repository<Categories> ) {}

    async saveEnumCategorie(){
        const categories = Object.values(CategorieEnum).map((name) => {
            const categorie = new Categories();
            categorie.name = name;
            return categorie;
        });

        await this.categories.save(categories);
    }

    async findAll(){
        return this.categories.find();
    }
}
