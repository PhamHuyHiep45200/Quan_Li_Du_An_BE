import { Test, TestingModule } from '@nestjs/testing';
import { CommentTaskController } from './comment_task.controller';

describe('CommentTaskController', () => {
  let controller: CommentTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentTaskController],
    }).compile();

    controller = module.get<CommentTaskController>(CommentTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
