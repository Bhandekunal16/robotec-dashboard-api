import { Module } from '@nestjs/common';
import { InstaService } from './insta.service';
import { InstaController } from './insta.controller';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [InstaController],
  providers: [InstaService, CommonService],
})
export class InstaModule {}
