import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { WatchlistActionEnum } from 'src/common/enums/watchlistAction.enum';
export class SaveWatchlistDto {
  @ApiProperty({
    description: 'movieId',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  movieId: string;

  @ApiProperty({
    description: 'action (ADD,DELETE)',
    enum: WatchlistActionEnum,
    example: WatchlistActionEnum.ADD,
  })
  @IsNotEmpty()
  @IsEnum(WatchlistActionEnum)
  action: WatchlistActionEnum;
}
