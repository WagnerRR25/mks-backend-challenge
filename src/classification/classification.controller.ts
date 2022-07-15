import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { CreateClassificationDto } from './dto/create-classification.dto';

@Controller('classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post()
  create(@Body() createClassificationDto: CreateClassificationDto) {
    return this.classificationService.create(createClassificationDto);
  }

  @Get()
  findAll() {
    return this.classificationService.findAll();
  }
}
