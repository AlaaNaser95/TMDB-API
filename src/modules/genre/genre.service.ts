import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/database/entities/genre.entity';
import { Repository } from 'typeorm';
import { GenreDto } from './dto/response/genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}
  async listGenres() {
    try {
      const genres = await this.genreRepository.find();
      return genres.map((genre) => new GenreDto(genre));
    } catch (error) {
      console.log('Something went wrong:', error);
      throw error;
    }
  }
}
