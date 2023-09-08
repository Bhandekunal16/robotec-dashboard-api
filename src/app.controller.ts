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
  getHello(): any {
    return this.button.ButtonUi();
  }

  @Post('get/dashboard')
  createDashboard(@Body() body: any) {
    return this.dashboard.createDashboard(body);
  }

  @Post('get/ButtonUI')
  getButton(@Body() body: any) {
    return this.button.ButtonUiResponsive(body);
  }
}
