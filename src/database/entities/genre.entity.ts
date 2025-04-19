import { Column, Entity, ManyToMany } from 'typeorm';

import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Base } from './base.entity';
import { Movie } from './movie.entity';

@Entity()
export class Genre extends Base {
  @Column('varchar', { length: 255 })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  tmdb_id: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  movies: Movie[];
}
