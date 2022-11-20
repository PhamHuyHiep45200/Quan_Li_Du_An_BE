import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async findId(idItem: number) {
    const dataResponse: any = await this.prisma.item.findFirst({
      where: {
        id: idItem,
      },
      include: { Task: { include: { UserTask: { include: { User: true } } } } },
    });
    const data: any = [];
    if (dataResponse) {
      data.push({
        name: 'Open',
        type: 'OPEN',
        data: dataResponse?.Task?.filter((item) => item?.status === 'OPEN'),
      });
      data.push({
        name: 'Doing',
        type: 'DOING',
        data: dataResponse?.Task?.filter((item) => item?.status === 'DOING'),
      });
      data.push({
        name: 'Completed',
        type: 'COMPLETED',
        data: dataResponse?.Task?.filter(
          (item) => item?.status === 'COMPLETED',
        ),
      });
      data.push({
        name: 'Illegal',
        type: 'ILLEGAL',
        data: dataResponse?.Task?.filter((item) => item?.status === 'ILLEGAL'),
      });
      data.push({
        name: 'Pendding',
        type: 'PENDDING',
        data: dataResponse?.Task?.filter((item) => item?.status === 'PENDDING'),
      });
    }
    return { status: 200, data, count: dataResponse?.Task?.length };
  }
  getTaskIdChil() {
    return this.prisma.task.findMany({
      include: { taskParent: true, taskChildren: true },
    });
  }
  async create(createTaskDto: CreateTaskDto) {
    const id_user_item = await this.prisma.userItem.findFirst({
      where: { id_user: createTaskDto.id_user, id_item: createTaskDto.id_item },
    });
    if (!id_user_item) {
      await this.prisma.userItem.create({
        data: {
          id_item: createTaskDto.id_item,
          id_user: createTaskDto.id_user,
        },
      });
    }
    const data = await this.prisma.task.create({
      data: {
        id_item: createTaskDto.id_item,
        status: createTaskDto.status,
        taskParentId: createTaskDto.taskParentId,
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
    return { status: 200, data };
  }
  findAll() {
    return this.prisma.item.findMany();
  }
  async updateStatusTask(id: number, query: UpdateTaskDto) {
    const data = await this.prisma.task.update({
      where: { id },
      data: query,
    });
    return { status: 200, data };
  }
  async deleteStatusTask(id: number) {
    const data = await this.prisma.task.update({
      where: { id },
      data: { deleteFlg: true },
    });
    return { status: 200, data };
  }
}
