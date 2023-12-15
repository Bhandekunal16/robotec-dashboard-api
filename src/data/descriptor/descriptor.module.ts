import { Module } from '@nestjs/common';
import { Encrypt } from './descriptor';
import { DescriptorController } from './descriptor.controller';
import { ValidationService } from '../validation/validation.service';

@Module({
  providers: [Encrypt, ValidationService],
  controllers: [DescriptorController],
})
export class DescriptorModule {}
