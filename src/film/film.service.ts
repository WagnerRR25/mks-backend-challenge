import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Classification } from 'src/classification/entities/classification.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepo: Repository<Film>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Classification)
    private classificationRepo: Repository<Classification>,
  ) {}
  async create(createFilmDto: CreateFilmDto) {
    const film = this.filmRepo.create(createFilmDto);
    film.categories = await this.categoryRepo.findOne({
      id: createFilmDto.categoryId,
    });
    film.classifications = await this.classificationRepo.findOne({
      id: createFilmDto.classificationId,
    });
    console.log(film);
    if (!film.categories || !film.classifications) {
      throw new HttpException(
        'Categoria ou classificação não encontrada!!',
        HttpStatus.NOT_FOUND,
      );
    }

    const filmCreated = await this.filmRepo.save(film);
    return {
      title: filmCreated.title,
      sinopse: filmCreated.sinopse,
      category: filmCreated.categories.label,
      classification: filmCreated.classifications.label,
    };
  }
  findAll() {
    return this.filmRepo.find({
      relations: ['categories', 'classifications'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
