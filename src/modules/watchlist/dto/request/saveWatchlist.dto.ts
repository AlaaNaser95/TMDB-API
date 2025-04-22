import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { WatchlistActionEnum } from 'src/common/enums/watchlistAction.enum';
export class SaveWatchlistDto {
  @IsNotEmpty()
  @IsInt()
  movieId: string;

  @IsNotEmpty()
  @IsEnum(WatchlistActionEnum)
  action;
}
