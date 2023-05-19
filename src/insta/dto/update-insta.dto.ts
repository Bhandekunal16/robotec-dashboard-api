import { PartialType } from '@nestjs/mapped-types';
import { CreateInstaDto } from './create-insta.dto';

export class UpdateInstaDto extends PartialType(CreateInstaDto) {}
