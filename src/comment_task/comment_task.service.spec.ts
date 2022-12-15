import { Test, TestingModule } from '@nestjs/testing';
import { CommentTaskService } from './comment_task.service';

describe('CommentTaskService', () => {
  let service: CommentTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentTaskService],
    }).compile();

    service = module.get<CommentTaskService>(CommentTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
