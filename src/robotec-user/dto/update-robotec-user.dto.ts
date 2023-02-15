import { PartialType } from '@nestjs/mapped-types';
import { CreateRobotecUserDto } from './create-robotec-user.dto';

export class UpdateRobotecUserDto extends PartialType(CreateRobotecUserDto) {}
