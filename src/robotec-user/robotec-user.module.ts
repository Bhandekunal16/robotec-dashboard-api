import { Module } from '@nestjs/common';
import { RobotecUserService } from './robotec-user.service';
import { RobotecUserController } from './robotec-user.controller';

@Module({
  controllers: [RobotecUserController],
  providers: [RobotecUserService],
})
export class RobotecUserModule {}
