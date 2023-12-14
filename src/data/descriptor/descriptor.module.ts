import { Module } from '@nestjs/common';
import { Encrypt } from './descriptor';
import { DescriptorController } from './descriptor.controller';

@Module({
  providers: [Encrypt],
  controllers: [DescriptorController],
})
export class DescriptorModule {}
