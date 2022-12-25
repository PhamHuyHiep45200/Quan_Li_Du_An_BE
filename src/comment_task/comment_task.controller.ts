import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentTaskService } from './comment_task.service';
import { CreateCommentTaskDto } from './dto/create-comment_task.dto';
import { UpdateCommentTaskDto } from './dto/update-comment_task.dto';

@ApiTags('comment task')
@Controller('comment-task')
export class CommentTaskController {
  constructor(private commentTaskService: CommentTaskService) {}
  @Get()
  getAllCommentTask() {
    return this.commentTaskService.getAllCommentTask();
  }

  @Post()
  createCommentTask(@Body() createCommentTask: CreateCommentTaskDto) {
    return this.commentTaskService.createCommentTask(createCommentTask);
  }

  @Put('/update/:id')
  updateCommentTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentTask: UpdateCommentTaskDto,
  ) {
    return this.commentTaskService.updateCommentTask(id, updateCommentTask);
  }

  @Put('/delete/:id')
  deleteCommentTask(@Param('id', ParseIntPipe) id: number) {
    return this.commentTaskService.deleteCommentTask(id);
  }

  @Get('/:id_task')
  getByIdCommentTask(@Param('id_task', ParseIntPipe) id_task: number) {
    return this.commentTaskService.getByIdCommentTask(id_task);
  }
}
