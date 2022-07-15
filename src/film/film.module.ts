import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Classification } from 'src/classification/entities/classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Category, Classification])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
