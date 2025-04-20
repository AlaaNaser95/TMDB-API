import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
  constructor(private genreService: GenreService) {}
  @Get()
  async listGenres() {
    return await this.genreService.listGenres();
  }
}
