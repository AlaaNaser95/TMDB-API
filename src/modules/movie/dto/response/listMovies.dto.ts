import { Movie } from 'src/database/entities/movie.entity';

export class ListMoviesDto {
  readonly id: number;
  readonly title: string;
  readonly releaseDate: Date;
  readonly posterLink: string;

  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.releaseDate = movie.releaseDate;
    this.posterLink = movie.posterLink;
  }
}
