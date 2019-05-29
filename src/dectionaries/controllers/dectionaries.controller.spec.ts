import { Test, TestingModule } from '@nestjs/testing';
import { DectionariesController } from './dectionaries.controller';

describe('Dectionaries Controller', () => {
  let controller: DectionariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DectionariesController],
    }).compile();

    controller = module.get<DectionariesController>(DectionariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
