import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateMovieDto {
  @ApiProperty({ description: 'Title of the movie' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Overview of the movie' })
  @IsNotEmpty()
  @IsString()
  overview: string;

  @ApiProperty({
    description: 'Movie Poster URL',
    example: 'https://google.com',
  })
  @IsNotEmpty()
  @IsString()
  posterLink: string;

  @ApiProperty({
    description: 'Release date of the movie',
    example: '2025-02-27',
  })
  @IsNotEmpty()
  @IsString()
  releaseDate: Date;

  @ApiProperty({
    description: 'Original Language for the movie in ISO3 format',
    example: 'en',
  })
  @IsNotEmpty()
  @IsString()
  originalLanguage: string;

  @ApiProperty({
    description: 'Array of genre ids for movie',
    example: [1, 3, 17],
  })
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  genreIds: number[];
}
