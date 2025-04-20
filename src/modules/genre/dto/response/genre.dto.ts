import { Genre } from 'src/database/entities/genre.entity';

export class GenreDto {
  readonly id: number;
  readonly name: string;

  constructor(genre: Genre) {
    this.id = genre.id;
    this.name = genre.name;
  }
}
