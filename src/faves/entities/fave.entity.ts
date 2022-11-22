import { IsNumber, Max } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Max(100)
  rank: number;

  @ManyToOne(() => User, (fave: User) => fave.Fave)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
