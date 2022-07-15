import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  sinopse: string;

  @ApiProperty()
  classificationId: string;
}
