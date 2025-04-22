import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
export class UpdateMovieDto {
  @ApiPropertyOptional({
    description: 'Overview',
  })
  @IsOptional()
  @IsString()
  overview?: string;

  @ApiPropertyOptional({
    description: 'Poster URL',
  })
  @IsOptional()
  @IsString()
  posterLink?: string;

  @ApiPropertyOptional({
    description: 'Array of updated movie genreIds ',
    example: [1, 3, 15],
  })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  genreIds?: number[];
}
