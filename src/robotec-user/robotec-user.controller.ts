import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RobotecUserService } from './robotec-user.service';
import { CreateRobotecUserDto } from './dto/create-robotec-user.dto';
import { UpdateRobotecUserDto } from './dto/update-robotec-user.dto';

@Controller('robotec-user')
export class RobotecUserController {
  constructor(private readonly robotecUserService: RobotecUserService) {}

  // @Post()
  // create(@Body() createRobotecUserDto: CreateRobotecUserDto) {
  //   return this.robotecUserService.create(createRobotecUserDto);
  // }

  @Post('test')
  register(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.register(createRobotecUserDto);
  }

  @Post('login')
  login(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.login(createRobotecUserDto);
  }

  @Post('avtor')
  avtor(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.avtor(createRobotecUserDto);
  }

  @Post('registershop')
  shopname(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.shopname(createRobotecUserDto);
  }
}
