import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);
    const categoryCreated = await this.categoryRepo.save(category);
    return {
      label: categoryCreated.label,
    };
  }
  findAll() {
    return this.categoryRepo.find();
  }
}
