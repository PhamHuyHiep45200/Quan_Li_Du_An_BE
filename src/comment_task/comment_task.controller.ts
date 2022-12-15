import { Controller, Get, Post, Put } from '@nestjs/common';
import { CommentTaskService } from './comment_task.service';

@Controller('comment-task')
export class CommentTaskController {
  constructor(private commentTaskService: CommentTaskService) {}
  @Get()
  getAllCommentTask() {
    return this.commentTaskService.getAllCommentTask();
  }

  @Post()
  createCommentTask() {
    return this.commentTaskService.createCommentTask();
  }

  @Put('/update/:id')
  updateCommentTask() {
    return this.commentTaskService.updateCommentTask();
  }

  @Put('/delete/:id')
  deleteCommentTask() {
    return this.commentTaskService.deleteCommentTask();
  }

  @Get('/:id')
  getByIdCommentTask() {
    return this.commentTaskService.getByIdCommentTask();
  }
}
