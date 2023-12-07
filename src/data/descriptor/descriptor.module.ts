import { Module } from '@nestjs/common';
import { Encrypt } from './descriptor';

@Module({
  providers: [Encrypt],
})
export class DescriptorModule {}
