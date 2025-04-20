import { Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from './base.entity';
import { Watchlist } from './watchlist.entity';
import { Rating } from './rating.entity';

@Entity()
export class User extends Base {
  @Column('varchar', { length: 255 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlists: Watchlist[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
