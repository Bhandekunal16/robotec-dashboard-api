import { Test, TestingModule } from '@nestjs/testing';
import { RobotecUserService } from './robotec-user.service';

describe('RobotecUserService', () => {
  let service: RobotecUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RobotecUserService],
    }).compile();

    service = module.get<RobotecUserService>(RobotecUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
