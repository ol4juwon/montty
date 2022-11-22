import { IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class CreateFaveDto {
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
