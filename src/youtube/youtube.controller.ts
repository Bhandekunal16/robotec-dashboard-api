import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { UpdateYoutubeDto } from './dto/update-youtube.dto';
import { youtube } from 'src/route/routes';

@Controller(youtube.Controller)
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post(youtube.CreateYoutube)
  createYoutube(@Body() createYoutubeDto: CreateYoutubeDto) {
    return this.youtubeService.createYoutube(createYoutubeDto);
  }

  @Get(youtube.getCount)
  getCount1(createYoutubeDto: CreateYoutubeDto) {
    return this.youtubeService.getCount1(createYoutubeDto);
  }

  @Get(youtube.getAll)
  youtube(createYoutubeDto: CreateYoutubeDto) {
    return this.youtubeService.getAllYoutube(createYoutubeDto);
  }

  @Post(youtube.get)
  getYoutube(@Body() createYoutubeDto: CreateYoutubeDto) {
    return this.youtubeService.getYoutube(createYoutubeDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.youtubeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateYoutubeDto: UpdateYoutubeDto) {
  //   return this.youtubeService.update(+id, updateYoutubeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.youtubeService.remove(+id);
  // }
}