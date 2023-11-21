import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { login } from './dto/login-dto';
import { addTask } from './dto/Add-task.dto';
import { getTask } from './dto/get-task.dto';
import { removeTask } from './dto/remove-task.dto';
import { editTask } from './dto/edit-task.dto';
import { setTaskStatusPending } from './dto/set-task-status-pending.dto';
import { getTaskCount } from './dto/get-task-count.dto';
import { updatesTask } from './dto/updates-task.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateAuthDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: login) {
    return await this.authService.login(body);
  }

  @Post('task/add')
  async addTask(@Body() body: addTask) {
    return await this.authService.AddTask(body);
  }

  @Post('task/get')
  async GetTask(@Body() body: getTask) {
    return await this.authService.getTask(body);
  }

  @Post('task/remove')
  async removeTask(@Body() body: removeTask) {
    return await this.authService.removeTask(body);
  }

  @Post('task/status')
  async editTaskStatus(@Body() body: editTask) {
    return await this.authService.editTaskStatus(body);
  }

  @Post('task/status/pending')
  async setTaskStatusPending(@Body() body: setTaskStatusPending) {
    return await this.authService.setTaskStatusPending(body);
  }

  @Post('task/updates')
  async getTaskUpdate(@Body() body: updatesTask) {
    return await this.authService.getTaskUpdate(body);
  }
  @Post('task/count')
  async getTaskCount(@Body() body: getTaskCount) {
    return await this.authService.getTaskCount(body);
  }

  @Get('task/get/:email')
  async matchUser(@Param('email') email: any) {
    return await this.authService.matchUser(email);
  }
}
