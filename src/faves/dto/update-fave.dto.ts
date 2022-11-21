import { PartialType } from '@nestjs/mapped-types';
import { CreateFaveDto } from './create-fave.dto';

export class UpdateFaveDto extends PartialType(CreateFaveDto) {}
