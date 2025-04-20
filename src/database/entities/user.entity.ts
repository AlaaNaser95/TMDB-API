import { Column, Entity, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @Column('varchar', { length: 255 })
  @IsNotEmpty()
  @IsString()
  name: string;
}
