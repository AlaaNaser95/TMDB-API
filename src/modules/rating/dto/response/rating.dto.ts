import { Rating } from 'src/database/entities/rating.entity';
import { ListMoviesDto } from 'src/modules/movie/dto/response/listMovies.dto';

export class RatingDto {
  readonly id: number;
  readonly score: number;
  readonly movie: ListMoviesDto;

  constructor(rating: Rating) {
    this.id = rating.id;
    this.score = rating.score;
    if (rating.movie) {
      this.movie = new ListMoviesDto(rating.movie);
    }
  }
}
