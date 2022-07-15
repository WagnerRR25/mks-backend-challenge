import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { Classification } from './entities/classification.entity';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Classification)
    private classificationRepo: Repository<Classification>,
  ) {}
  async create(createClassificationDto: CreateClassificationDto) {
    const classification = this.classificationRepo.create(
      createClassificationDto,
    );
    const classificationCreated = await this.classificationRepo.save(
      classification,
    );
    return {
      label: classificationCreated.label,
    };
  }
  findAll() {
    return this.classificationRepo.find();
  }
}
