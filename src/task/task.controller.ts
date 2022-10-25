import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
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
}
