import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderingEnum } from 'src/common/enums/ordering.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationRequestDto {
  @ApiPropertyOptional({ description: 'page number', example: 1, default: 1 })
  @Transform((value) => {
    return value.value ? parseInt(value.value) : value.value;
  })
  @IsOptional()
  @IsInt()
  page: number = 1;

  @ApiPropertyOptional({ description: 'page limit', example: 10, default: 10 })
  @Transform((value) => {
    return value.value ? parseInt(value.value) : value.value;
  })
  @IsOptional()
  @IsInt()
  limit: number = 10;

  @ApiPropertyOptional({
    description: 'Sorting by date created',
    enum: OrderingEnum,
    example: 'ASC',
    default: 'DESC',
  })
  @IsOptional()
  @IsEnum(OrderingEnum)
  sort: OrderingEnum = OrderingEnum.DESC;
}
