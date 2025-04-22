import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
export class SaveRatingDto {
  @ApiProperty({
    description: 'Rating Integer from 1 to 10',
    minimum: 1,
    maximum: 10,
    example: 10,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  score: number;
}
