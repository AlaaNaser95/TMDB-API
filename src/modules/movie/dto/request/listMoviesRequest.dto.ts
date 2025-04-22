import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationRequestDto } from 'src/common/dto/request/paginationRquest.dto';
export class ListMoviesRquestDto extends PaginationRequestDto {
  @ApiPropertyOptional({
    description: 'Search by movie title',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by genre ID',
    example: 1,
  })
  @Transform((value) => {
    return value.value ? parseInt(value.value) : value.value;
  })
  @IsOptional()
  @IsInt()
  genreId?: number;
}
