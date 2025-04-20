import { Movie } from 'src/database/entities/movie.entity';
import { ListMoviesDto } from './listMovies.dto';
import { GenreDto } from '../../../genre/dto/response/genre.dto';

export class MovieDto extends ListMoviesDto {
  readonly originalLanguage: string;
  readonly overview: string;
  readonly grenres: GenreDto[];

  constructor(movie: Movie) {
    super(movie);
    this.originalLanguage = movie.originalLanguage;
    this.overview = movie.overview;
    if (movie.genres) {
      this.grenres = movie.genres.map((genre) => new GenreDto(genre));
    }
  }
}
