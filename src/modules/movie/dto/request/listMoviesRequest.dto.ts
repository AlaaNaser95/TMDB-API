import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationRequestDto } from 'src/common/dto/request/paginationRquest.dto';
export class ListMoviesRquestDto extends PaginationRequestDto {
  @IsOptional()
  @IsString()
  search?: string;

  @Transform((value) => {
    return value.value ? parseInt(value.value) : value.value;
  })
  @IsOptional()
  @IsInt()
  genreId?: number;
}
