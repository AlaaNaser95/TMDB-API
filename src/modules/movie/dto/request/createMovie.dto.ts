import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  overview: string;

  @IsNotEmpty()
  @IsString()
  posterLink: string;

  @IsNotEmpty()
  @IsString()
  releaseDate: Date;

  @IsNotEmpty()
  @IsString()
  originalLanguage: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  genreIds: number[];
}
