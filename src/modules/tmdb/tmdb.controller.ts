import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbController {
  constructor(private tmdbService: TmdbService) {}

  @Get('movies/popular')
  async listPopularMovies(@Query('page', ParseIntPipe) page?: number) {
    return await this.tmdbService.listPopularMovies(page);
  }
  @Get('movies/genres')
  async listMovieGenres() {
    return await this.tmdbService.listMoviesGenres();
  }
}
