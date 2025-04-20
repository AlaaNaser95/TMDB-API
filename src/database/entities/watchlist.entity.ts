import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Base } from './base.entity';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
@Unique(['userId', 'movieId'])
export class Watchlist extends Base {
  @Column('int')
  @IsNotEmpty()
  @IsInt()
  movieId: number;

  @Column('int')
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ManyToOne(() => User, (user) => user.watchlists, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.watchlists, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  movie: Movie;
}
