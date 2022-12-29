import { Test, TestingModule } from '@nestjs/testing';
import { WorkMeService } from './work-me.service';

describe('WorkMeService', () => {
  let service: WorkMeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkMeService],
    }).compile();

    service = module.get<WorkMeService>(WorkMeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
