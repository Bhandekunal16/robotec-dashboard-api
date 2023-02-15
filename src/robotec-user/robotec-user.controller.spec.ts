import { Test, TestingModule } from '@nestjs/testing';
import { RobotecUserController } from './robotec-user.controller';
import { RobotecUserService } from './robotec-user.service';

describe('RobotecUserController', () => {
  let controller: RobotecUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RobotecUserController],
      providers: [RobotecUserService],
    }).compile();

    controller = module.get<RobotecUserController>(RobotecUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
