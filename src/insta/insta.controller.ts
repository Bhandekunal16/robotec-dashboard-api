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

  @Post()
  create(@Body() createInstaDto: CreateInstaDto) {
    return this.instaService.create(createInstaDto);
  }

  @Get()
  findAll() {
    return this.instaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstaDto: UpdateInstaDto) {
    return this.instaService.update(+id, updateInstaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instaService.remove(+id);
  }
}
