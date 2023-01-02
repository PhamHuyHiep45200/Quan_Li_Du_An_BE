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
    let where_id_user;
    if (getTaskDto.id_user) {
      where_id_user = { id_user: +getTaskDto.id_user };
    }
    const dataAll = await this.prisma.task.findMany({
      where: {
        id_item: idItem,
      },
      include: {
        taskParent: true,
        taskChildren: true,
        UserTask: {
          include: { User: true },
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
            UserTask: {
              include: { User: true },
              where: { ...where_id_user },
            },
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
            (item) =>
              item?.status === 'OPEN' &&
              item?.taskParentId == null &&
              item?.UserTask.length > 0,
          ),
        ),
      });
      data.push({
        name: 'Doing',
        type: 'DOING',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) =>
              item?.status === 'DOING' &&
              item?.taskParentId == null &&
              item?.UserTask.length > 0,
          ),
        ),
      });
      data.push({
        name: 'Completed',
        type: 'COMPLETED',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) =>
              item?.status === 'COMPLETED' &&
              item?.taskParentId == null &&
              item?.UserTask.length > 0,
          ),
        ),
      });
      data.push({
        name: 'Illegal',
        type: 'ILLEGAL',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) =>
              item?.status === 'ILLEGAL' &&
              item?.taskParentId == null &&
              item?.UserTask.length > 0,
          ),
        ),
      });
      data.push({
        name: 'Pendding',
        type: 'PENDDING',
        data: deQuyData(
          dataResponse?.Task?.filter(
            (item) =>
              item?.status === 'PENDDING' &&
              item?.taskParentId == null &&
              item?.UserTask.length > 0,
          ),
        ),
      });
    }
    const listUser = await this.prisma.item.findFirst({
      where: { id: idItem },
      include: { Group: { include: { UserGroup: true } } },
    });
    const count = data.reduce((prev, cur) => prev + cur.data.length, 0);
    return { status: 200, data, count, dataResponse, list: listUser };
  }
  async getCalendar(getCalendar: GetCalendarDto) {
    const data = await this.prisma.task.findMany({
      where: {
        id_item: +getCalendar.id_item,
        OR: [
          {
            start_Time: {
              gte: getCalendar.start_date,
              lte: getCalendar.end_date,
            },
          },
          {
            end_Time: {
              gte: getCalendar.start_date,
              lte: getCalendar.end_date,
            },
          },
        ],
      },
      include: { UserTask: { where: { id_user: +getCalendar.id_user } } },
    });
    const requestData = data.filter((da) => da.UserTask.length > 0);
    return { status: 200, data: requestData };
  }
  async create(createTaskDto: CreateTaskDto) {
    const id_user_item = await this.prisma.userItem.findFirst({
      where: { id_user: createTaskDto.id_user, id_item: createTaskDto.id_item },
    });
    if (!id_user_item) {
      await this.prisma.userItem.create({
        data: {
          id_item: createTaskDto.id_item ?? null,
          id_user: createTaskDto.id_user,
        },
      });
    }
    const data = await this.prisma.task.create({
      data: {
        id_item: createTaskDto.id_item ?? null,
        status: createTaskDto.status,
        taskParentId: createTaskDto.taskParentId,
        descriptions: createTaskDto.descriptions,
        start_Time: createTaskDto.start_Time,
        end_Time: createTaskDto.end_Time,
        thumbnail: createTaskDto.thumbnail,
        UserTask: {
          create: {
            id_user: createTaskDto.id_user,
            userManager: createTaskDto.userManager,
          },
        },
        History: {
          create: {
            createTask: true,
            oldStatus: createTaskDto.status,
            newStatus: createTaskDto.status,
            idUserChange: createTaskDto.id_user,
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
    console.log('data', query);
    const dataRequest = { ...query };
    delete dataRequest.idUserChange;
    const task = await this.prisma.task.findFirst({
      where: { id },
    });
    const data = await this.prisma.task.update({
      where: { id },
      data: dataRequest,
    });
    if (data && query.status) {
      await this.prisma.history.create({
        data: {
          createTask: false,
          oldStatus: task.status,
          newStatus: query.status,
          idUserChange: +query.idUserChange,
          taskHistory: id,
        },
      });
    }
    // await this.eventsGateway.handleEvent(query);
    return { status: 200, data };
  }
  async deleteStatusTask(id: number) {
    const data = await this.prisma.task.delete({
      where: { id },
    });
    return { status: 200, data };
  }
}
