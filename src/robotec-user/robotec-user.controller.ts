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
import { user } from 'src/routes/routes';

@Controller(user.Controller)
export class RobotecUserController {
  constructor(private readonly robotecUserService: RobotecUserService) {}

  @Post(user.register)
  register(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.register(createRobotecUserDto);
  }

  @Post(user.Login)
  login(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.login(createRobotecUserDto);
  }

  @Post(user.Avtor)
  avtor(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.avtor(createRobotecUserDto);
  }

  @Post(user.RegisterShop)
  shopname(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.shopname(createRobotecUserDto);
  }

  @Patch(user.EditProfile)
  editProfile(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.editProfile(createRobotecUserDto);
  }

  @Get(user.GetAllUser)
  allUser(@Body() createRobotecUserDto: CreateRobotecUserDto) {
    return this.robotecUserService.allUser(createRobotecUserDto);
  }
}
