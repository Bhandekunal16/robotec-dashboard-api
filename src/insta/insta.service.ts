import { Injectable } from '@nestjs/common';
import { CreateInstaDto } from './dto/create-insta.dto';
import { UpdateInstaDto } from './dto/update-insta.dto';

@Injectable()
export class InstaService {
  create(createInstaDto: CreateInstaDto) {
    return 'This action adds a new insta';
  }

  findAll() {
    return `This action returns all insta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} insta`;
  }

  update(id: number, updateInstaDto: UpdateInstaDto) {
    return `This action updates a #${id} insta`;
  }

  remove(id: number) {
    return `This action removes a #${id} insta`;
  }
}
