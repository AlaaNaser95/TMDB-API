import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  overview?: string;

  @IsOptional()
  @IsString()
  posterLink?: string;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  genreIds?: Number[];
}
