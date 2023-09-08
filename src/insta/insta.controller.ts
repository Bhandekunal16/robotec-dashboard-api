import { Controller, Get, Post, Body } from '@nestjs/common';
import { InstaService } from './insta.service';
import { CreateInstaDto } from './dto/create-insta.dto';
import { instagram } from 'src/routes/routes';

@Controller(instagram.Controller)
export class InstaController {
  constructor(private readonly instaService: InstaService) {}

  @Post(instagram.createInsta)
  createInsta(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.createInsta(createInstaDto);
  }

  @Get(instagram.getAll)
  getAllInst(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.getAllInst(createInstaDto);
  }

  @Get(instagram.getFollower)
  getFollower(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.getFollower(createInstaDto);
  }

  @Get(instagram.getFollowing)
  getFollowing(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.getFollowing(createInstaDto);
  }

  @Post(instagram.getInsta)
  getInsta(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.getInsta(createInstaDto);
  }
}
