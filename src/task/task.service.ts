import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    const createTask = await this.prisma.task.create({
      data: {
        id_item: createTaskDto.id_item ? createTaskDto.id_item : null,
        descriptions: createTaskDto.descriptions,
        userManager: createTaskDto.userManager,
        start_Time: createTaskDto.start_Time,
        end_Time: createTaskDto.end_Time,
        planned_Time: createTaskDto.planned_Time,
        level: createTaskDto.level,
        createdAt: createTaskDto.createdAt,
        updatedAt: createTaskDto.updatedAt,
      },
    });
    if (createTask) {
      this.prisma.userTask.create({
        data: {
          id_user: createTaskDto.id_user,
          id_task: createTask.id,
        },
      });
    }
    return { createTask };
  }
  findAll() {
    return this.prisma.task.findMany({});
  }
}
