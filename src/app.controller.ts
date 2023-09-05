import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ButtonService } from './button/button.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private button: ButtonService,
  ) {}

  @Get()
  getHello(): any {
    return this.button.ButtonUi();
  }

  @Post('get/ButtonUI')
  getButton(@Body() body: any) {
    return this.button.ButtonUiResponsive(body);
  }
}
