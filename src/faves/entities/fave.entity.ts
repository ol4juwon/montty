import { IsNumber, IS_NUMBER } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fave')
export class Fave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  user_id: number;

  @Column()
  @IsNumber()
  movie_id: number;

  @Column()
  @IsNumber()
  rank: number;
}
