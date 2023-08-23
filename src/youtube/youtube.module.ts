import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [YoutubeController],
  providers: [YoutubeService, CommonService],
})
export class YoutubeModule {}
