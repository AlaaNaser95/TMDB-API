import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/database/entities/genre.entity';
import { Repository } from 'typeorm';
import { GenreDto } from './dto/response/genre.dto';
import { AppHelper } from 'src/common/helpers/app.helper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async listGenres() {
    try {
      const genres = await AppHelper.getOrSetCache(
        this.cacheManager,
        'genres-list',
        async () => await this.genreRepository.find(),
      );
      return genres.map((genre) => new GenreDto(genre));
    } catch (error) {
      console.log('Something went wrong:', error);
      throw error;
    }
  }
}
