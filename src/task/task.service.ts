import { Injectable } from '@nestjs/common';
import { EventsGateway } from 'src/event/events.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetCalendarDto } from './dto/get-calendar.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}
  async findId(idItem: number, getTaskDto: GetTaskDto) {
    const dataAll = await this.prisma.task.findMany({
      where: { id_item: idItem, private: getTaskDto.private ?? false },
      include: {
        taskParent: true,
        taskChildren: true,
        UserTask: {
          include: { User: true },
          where: { id_user: getTaskDto.idUser }, // get theo id Users
        },
      },
    });
    const filterFuc = (id: number) => {
      return dataAll.filter((da) => da.taskParentId === id);
    };
    const deQuyData = (dataParent) => {
      dataParent.map((parent) => {
        if (parent?.taskChildren?.length > 0) {
          const dataChil = filterFuc(parent.id);
          parent['children'] = dataChil;
          if (dataChil.length > 0) {
            deQuyData(dataChil);
          }
        }
      });
      return dataParent;
    };
    const dataResponse: any = await this.prisma.item.findFirst({
      where: {
        id: idItem,
      },
      include: {
        Task: {
          include: {
            UserTask: { include: { User: true } },
            taskParent: true,
            taskChildren: true,
            TaskUserManager: { include: { User: true } },
          },
        },
      },
    });
    const data: any = [];
    if (dataResponse) {
      data.push({
        name: 'Open',
        type: 'OPEN',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) => item?.status === 'OPEN' && item?.taskParentId == null,
          ),
        ),
      });
      data.push({
        name: 'Doing',
        type: 'DOING',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) => item?.status === 'DOING' && item?.taskParentId == null,
          ),
        ),
      });
      data.push({
        name: 'Completed',
        type: 'COMPLETED',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) =>
              item?.status === 'COMPLETED' && item?.taskParentId == null,
          ),
        ),
      });
      data.push({
        name: 'Illegal',
        type: 'ILLEGAL',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) => item?.status === 'ILLEGAL' && item?.taskParentId == null,
          ),
        ),
      });
      data.push({
        name: 'Pendding',
        type: 'PENDDING',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) => item?.status === 'PENDDING' && item?.taskParentId == null,
          ),
        ),
      });
    }
    return { status: 200, data, count: dataResponse?.Task?.length };
  }
  async getCalendar(getCalendar: GetCalendarDto) {
    const data = await this.prisma.item.findMany({
      where: {
        OR: [
          {
            startDate: {
              gte: getCalendar.start_date,
              lte: getCalendar.end_date,
            },
          },
          {
            endDate: {
              gte: getCalendar.start_date,
              lte: getCalendar.end_date,
            },
          },
        ],
      },
      include: {
        UserItem: {
          where: {
            id_user: +getCalendar.id_user,
            id_item: +getCalendar.id_item,
          },
        },
      },
    });
    return { status: 200, data };
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
        start_Time: createTaskDto.start_Time,
        end_Time: createTaskDto.end_Time,
        thumbnail: createTaskDto.thumbnail,
        private: createTaskDto.private,
        UserTask: {
          create: {
            id_user: createTaskDto.id_user,
            userManager: createTaskDto.userManager,
          },
        },
      },
    });
    const dataUserTask = await this.prisma.userTask.findMany({});
    return { status: 200, data, dataUserTask };
  }
  findAll() {
    return this.prisma.item.findMany();
  }
  async updateStatusTask(id: number, query: UpdateTaskDto) {
    const data = await this.prisma.task.update({
      where: { id },
      data: query,
    });
    await this.eventsGateway.handleEvent(query);
    return { status: 200, data };
  }
  async deleteStatusTask(id: number) {
    const data = await this.prisma.task.delete({
      where: { id },
    });
    return { status: 200, data };
  }
}
