import { IsAlpha, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  @Column()
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
