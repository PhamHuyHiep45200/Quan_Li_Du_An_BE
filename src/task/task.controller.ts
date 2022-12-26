import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetCalendarDto } from './dto/get-calendar.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/calendar')
  getCalendar(@Query() getCalendarDto: GetCalendarDto) {
    return this.taskService.getCalendar(getCalendarDto);
  }
  @Get()
  getAllTask() {
    return this.taskService.findAll();
  }
  @Get('/:idItem')
  getTaskId(
    @Param('idItem', ParseIntPipe) idItem: number,
    @Query() getTaskDto: GetTaskDto,
  ) {
    return this.taskService.findId(idItem, getTaskDto);
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
  @Delete('delete/:id')
  deleteStatusTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteStatusTask(id);
  }
}
