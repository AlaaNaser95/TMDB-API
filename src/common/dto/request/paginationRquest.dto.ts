import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderingEnum } from 'src/common/enums/ordering.enum';

export class PaginationRequestDto {
  @Transform((value) => {
    return value.value ? parseInt(value.value) : value.value;
  })
  @IsOptional()
  @IsInt()
  page: number = 1;

  @Transform((value) => {
    return value.value ? parseInt(value.value) : value.value;
  })
  @IsOptional()
  @IsInt()
  limit: number = 10;

  @IsOptional()
  @IsEnum(OrderingEnum)
  sort: OrderingEnum = OrderingEnum.DESC;
}
