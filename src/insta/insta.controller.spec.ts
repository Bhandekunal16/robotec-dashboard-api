import { Test, TestingModule } from '@nestjs/testing';
import { InstaController } from './insta.controller';
import { InstaService } from './insta.service';

describe('InstaController', () => {
  let controller: InstaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstaController],
      providers: [InstaService],
    }).compile();

    controller = module.get<InstaController>(InstaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
