import { Test, TestingModule } from '@nestjs/testing';
import { DescriptorController } from './descriptor.controller';

describe('DescriptorController', () => {
  let controller: DescriptorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptorController],
    }).compile();

    controller = module.get<DescriptorController>(DescriptorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
