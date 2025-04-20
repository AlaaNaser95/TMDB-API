import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Base } from './base.entity';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
@Unique(['userId', 'movieId'])
export class Rating extends Base {
  @Column('int')
  @IsNotEmpty()
  @IsInt()
  movieId: number;

  @Column('int')
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @Column('int')
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  score: number;

  @ManyToOne(() => User, (user) => user.ratings, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  movie: Movie;
}
