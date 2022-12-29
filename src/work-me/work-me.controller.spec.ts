import { Test, TestingModule } from '@nestjs/testing';
import { WorkMeController } from './work-me.controller';

describe('WorkMeController', () => {
  let controller: WorkMeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkMeController],
    }).compile();

    controller = module.get<WorkMeController>(WorkMeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
