import { Test, TestingModule } from '@nestjs/testing';
import { DectionariesService } from './dectionaries.service';

describe('DectionariesService', () => {
  let service: DectionariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DectionariesService],
    }).compile();

    service = module.get<DectionariesService>(DectionariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
