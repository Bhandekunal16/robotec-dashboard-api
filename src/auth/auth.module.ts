import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonService } from 'src/common/common.service';
import { JwtModule } from '@nestjs/jwt';
import { ValidationService } from 'src/data/validation/validation.service';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, CommonService, ValidationService],
})
export class AuthModule {}
