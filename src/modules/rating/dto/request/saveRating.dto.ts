import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
export class SaveRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  score: number;
}
