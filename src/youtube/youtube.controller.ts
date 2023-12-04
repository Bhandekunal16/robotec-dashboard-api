import { Controller, Get, Post, Body } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { youtube } from 'src/routes/routes';
import { getYoutubeVideo } from './dto/get-youtube.dto';

@Controller(youtube.Controller)
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post(youtube.CreateYoutube)
  createYoutube(@Body() createYoutubeDto: CreateYoutubeDto) {
    return this.youtubeService.createYoutube(createYoutubeDto);
  }

  @Get(youtube.getCount)
  getCount1() {
    return this.youtubeService.getCount1();
  }

  @Get(youtube.getAll)
  youtube() {
    return this.youtubeService.getAllYoutube();
  }

  @Post(youtube.get)
  getYoutube(@Body() createYoutubeDto: getYoutubeVideo) {
    return this.youtubeService.getYoutube(createYoutubeDto);
  }
}
