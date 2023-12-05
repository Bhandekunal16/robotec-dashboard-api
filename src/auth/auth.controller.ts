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
import { getUserEmail } from './dto/get-user-email.dto';
import { authRoute } from 'src/routes/routes';

@Controller(authRoute.Controller)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post(authRoute.Register)
  async register(@Body() body: CreateAuthDto) {
    return await this.authService.register(body);
  }

  @Post(authRoute.addInfo)
  async addInfo(@Body() body: CreateAuthDto) {
    return await this.authService.addInfo(body);
  }

  @Post(authRoute.Login)
  async login(@Body() body: login) {
    return await this.authService.login(body);
  }

  @Post(authRoute.addTask)
  async addTask(@Body() body: addTask) {
    return await this.authService.AddTask(body);
  }

  @Post(authRoute.getTask)
  async GetTask(@Body() body: getTask) {
    return await this.authService.getTask(body);
  }

  @Post(authRoute.removeTask)
  async removeTask(@Body() body: removeTask) {
    return await this.authService.removeTask(body);
  }

  @Post(authRoute.taskStatus)
  async editTaskStatus(@Body() body: editTask) {
    return await this.authService.editTaskStatus(body);
  }

  @Post(authRoute.setTaskStatusPending)
  async setTaskStatusPending(@Body() body: setTaskStatusPending) {
    return await this.authService.setTaskStatusPending(body);
  }

  @Post(authRoute.updateTask)
  async getTaskUpdate(@Body() body: updatesTask) {
    return await this.authService.getTaskUpdate(body);
  }
  @Post(authRoute.taskCount)
  async getTaskCount(@Body() body: getTaskCount) {
    return await this.authService.getTaskCount(body);
  }

  @Get('task/get/:email')
  async matchUser(@Param('email') email: any) {
    return await this.authService.matchUser(email);
  }
}
