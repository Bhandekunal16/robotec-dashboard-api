import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ButtonService } from './button/button.service';
import { DashboardService } from './dashboard/dashboard.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private button: ButtonService,
    private dashboard: DashboardService,
  ) {}

  @Get()
  async getHello() {
    return await this.button.ButtonUi();
  }

  @Post('get/dashboard')
  async createDashboard(@Body() body: any) {
    return await  this.dashboard.createDashboard(body);
  }

  @Post('get/ButtonUI')
  async getButton(@Body() body: any) {
    return await this.button.ButtonUiResponsive(body);
  }
}
