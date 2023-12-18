import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entities';
import { Repository } from 'typeorm';
import { categoriesDto } from './dto/categories.dto';
import { throws } from 'assert';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categorieRepository: Repository<Categories>,
  ) {}

  async createCategory(categorieDto: categoriesDto) {
    const existingCategory = await this.categorieRepository.findOne({
        where: { nameCat: categorieDto.nameCat },
    });
    
    
    
    if (!existingCategory) {
        const newCategory = this.categorieRepository.create(categorieDto);
        const savedCategory = await this.categorieRepository.save(newCategory);
        return savedCategory;
    } else {
        throw new ConflictException(`This category already exists`);
    }
}


async getAllCategories() {
    return await this.categorieRepository.find();
}
}
