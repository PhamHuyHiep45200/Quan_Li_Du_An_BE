import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  getAllTask() {
    return this.taskService.findAll();
  }
  @Get('/:idItem')
  getTaskId(@Param('idItem', ParseIntPipe) idItem: number) {
    return this.taskService.findId(idItem);
  }
  @Post()
  createGroup(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }
  @Put('update/:id')
  updateStatusTask(
    @Param('id', ParseIntPipe) id: number,
    @Query() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateStatusTask(id, updateTaskDto);
  }
  @Put('delete:id')
  deleteStatusTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteStatusTask(id);
  }
}
