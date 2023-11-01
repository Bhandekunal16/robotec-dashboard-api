import { Controller, Get, Post, Body } from '@nestjs/common';
import { InstaService } from './insta.service';
import { CreateInstaDto } from './dto/create-insta.dto';
import { instagram } from 'src/routes/routes';
import { GetInsta } from './dto/get-insta.dto';

@Controller(instagram.Controller)
export class InstaController {
  constructor(private readonly instaService: InstaService) {}

  @Post(instagram.createInsta)
  async createInsta(@Body() createInstaDto: CreateInstaDto) {
    return await this.instaService.createInsta(createInstaDto);
  }

  @Get(instagram.getAll)
  async getAllInst() {
    return await this.instaService.getAllInst();
  }

  @Get(instagram.getFollower)
  async getFollower() {
    return await this.instaService.getFollower();
  }

  @Get(instagram.getFollowing)
  async getFollowing() {
    return await this.instaService.getFollowing();
  }

  @Post(instagram.getInsta)
  async getInsta(@Body() createInstaDto: GetInsta) {
    return await this.instaService.getInsta(createInstaDto);
  }
}
