import { Test, TestingModule } from '@nestjs/testing';
import { ControlTestService } from './control-test.service';

describe('ControlTestService', () => {
  let service: ControlTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlTestService],
    }).compile();

    service = module.get<ControlTestService>(ControlTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
