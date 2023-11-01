import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { RobotecUserService } from './robotec-user.service';
import { CreateRobotecUserDto } from './dto/create-robotec-user.dto';
import { user } from 'src/routes/routes';

@Controller(user.Controller)
export class RobotecUserController {
  constructor(private readonly robotecUserService: RobotecUserService) {}

  @Post(user.register)
  async register(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return await this.robotecUserService.register(createRobotecUserDto);
  }

  @Post(user.Login)
  async login(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return await this.robotecUserService.login(createRobotecUserDto);
  }

  @Post(user.avatar)
  async avatar(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return await this.robotecUserService.avatar(createRobotecUserDto);
  }

  @Post(user.RegisterShop)
  async shopName(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return await this.robotecUserService.shopName(createRobotecUserDto);
  }

  @Patch(user.EditProfile)
  async editProfile(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return await this.robotecUserService.editProfile(createRobotecUserDto);
  }

  @Get(user.GetAllUser)
  async allUser(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return await this.robotecUserService.allUser(createRobotecUserDto);
  }
}
