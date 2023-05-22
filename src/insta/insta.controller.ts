import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstaService } from './insta.service';
import { CreateInstaDto } from './dto/create-insta.dto';
import { UpdateInstaDto } from './dto/update-insta.dto';
import { instagram } from 'src/route/routes';

@Controller(instagram.Controller)
export class InstaController {
  constructor(private readonly instaService: InstaService) {}

  @Post(instagram.createInsta)
  createInsta(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.createInsta(createInstaDto);
  }

  @Get(instagram.getAll)
  getAllinst(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.getAllinst(createInstaDto);
  }

  @Get(instagram.getFollower)
  getFollower(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.getFollower(createInstaDto);
  }

  @Get(instagram.getFollwing)
  getFollowing(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.getFollowing(createInstaDto);
  }

  @Post(instagram.getInsta)
  getInsta(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.getInsta(createInstaDto);
  }
}
