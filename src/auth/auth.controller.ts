import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return await this.authService.login(body);
  }

  @Post('task/add')
  async addTask(@Body() body: any) {
    return await this.authService.AddTask(body);
  }

  @Post('task/get')
  async GetTask(@Body() body: any) {
    return await this.authService.getTask(body);
  }

  @Post('task/remove')
  async removeTask(@Body() body: any) {
    return await this.authService.removeTask(body);
  }

  @Post('task/status')
  async editTaskStatus(@Body() body: any) {
    return await this.authService.editTaskStatus(body);
  }

  @Post('task/status/pending')
  async setTaskStatusPending(@Body() body: any) {
    return await this.authService.setTaskStatusPending(body);
  }

  
}
