import { Module } from '@nestjs/common';
import { InstaService } from './insta.service';
import { InstaController } from './insta.controller';

@Module({
  controllers: [InstaController],
  providers: [InstaService],
})
export class InstaModule {}
