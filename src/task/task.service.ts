import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  findId(idItem: number) {
    return this.prisma.task.findMany({
      where: {
        id_item: idItem,
      },
    });
  }
  async create(createTaskDto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: {
        id_item: createTaskDto.id_item,
        taskParent: createTaskDto.id_taskParent,
        descriptions: createTaskDto.descriptions,
        userManager: createTaskDto.userManager,
        start_Time: createTaskDto.start_Time,
        end_Time: createTaskDto.end_Time,
        level: createTaskDto.level,
        UserTask: {
          create: {
            id_user: createTaskDto.id_user,
          },
        },
      },
    });
  }
  findAll() {
    return this.prisma.task.findMany({});
  }
}
