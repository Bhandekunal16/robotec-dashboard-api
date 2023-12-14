import { Body, Controller, Post } from '@nestjs/common';
import { Encrypt } from './descriptor';

@Controller('descriptor')
export class DescriptorController {
  constructor(private encrypt: Encrypt) {}
  @Post('encrypt')
  async convertToBinary(@Body() body: any) {
    return await this.encrypt.convertToBinary2(body);
  }

  @Post('decrypt')
  async convertToStringFromBinary(@Body() body: any) {
    return await this.encrypt.convertToStringFromBinary(body);
  }
}
