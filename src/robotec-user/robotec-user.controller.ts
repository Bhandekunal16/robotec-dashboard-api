import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { RobotecUserService } from './robotec-user.service';
import { CreateRobotecUserDto } from './dto/create-robotec-user.dto';
import { user } from 'src/routes/routes';

@Controller(user.Controller)
export class RobotecUserController {
  constructor(private readonly robotecUserService: RobotecUserService) {}

  @Post(user.register)
  async register(@Body() body: CreateRobotecUserDto) {
    return await this.robotecUserService.register(body);
  }

  @Post(user.Login)
  async login(@Body() body: CreateRobotecUserDto) {
    return await this.robotecUserService.login(body);
  }

  @Post(user.avatar)
  async avatar(@Body() body: CreateRobotecUserDto) {
    return await this.robotecUserService.avatar(body);
  }

  @Post(user.RegisterShop)
  async shopName(@Body() body: CreateRobotecUserDto) {
    return await this.robotecUserService.shopName(body);
  }

  @Patch(user.EditProfile)
  async editProfile(@Body() body: CreateRobotecUserDto) {
    return await this.robotecUserService.editProfile(body);
  }

  @Get(user.GetAllUser)
  async allUser() {
    return await this.robotecUserService.allUser();
  }
}
