import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetWorkMe } from './dto/get-work-me.dto';

@Injectable()
export class WorkMeService {
  constructor(private prisma: PrismaService) {}
  async getAll(id: number) {
    const dataItem = await this.prisma.item.findMany({
      where: { id_group: null },
      include: {
        UserItem: { where: { id_user: id } },
        Task: true,
      },
    });
    const dataAll = await this.prisma.task.findMany({
      where: {
        id_item: null,
      },
      include: {
        taskParent: true,
        taskChildren: true,
        UserTask: {
          where: { id_user: id },
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
    const dataResponse: any = await this.prisma.task.findMany({
      where: { id_item: null },
      include: { UserTask: { where: { id_user: id } } },
    });

    const data: any = [];
    if (dataResponse.length > 0) {
      data.push({
        name: 'Open',
        type: 'OPEN',
        data: deQuyData(
          dataResponse?.filter(
            (item) =>
              item?.status === 'OPEN' &&
              item?.taskParentId == null &&
              item?.UserTask?.length > 0,
          ),
        ),
      });
      data.push({
        name: 'Doing',
        type: 'DOING',
        data: deQuyData(
          dataResponse?.filter(
            (item) =>
              item?.status === 'DOING' &&
              item?.taskParentId == null &&
              item?.UserTask?.length > 0,
          ),
        ),
      });
      data.push({
        name: 'Completed',
        type: 'COMPLETED',
        data: deQuyData(
          dataResponse?.filter(
            (item) =>
              item?.status === 'COMPLETED' &&
              item?.taskParentId == null &&
              item?.UserTask?.length > 0,
          ),
        ),
      });
      data.push({
        name: 'Illegal',
        type: 'ILLEGAL',
        data: deQuyData(
          dataResponse?.filter(
            (item) =>
              item?.status === 'ILLEGAL' &&
              item?.taskParentId == null &&
              item?.UserTask?.length > 0,
          ),
        ),
      });
      data.push({
        name: 'Pendding',
        type: 'PENDDING',
        data: deQuyData(
          dataResponse?.filter(
            (item) =>
              item?.status === 'PENDDING' &&
              item?.taskParentId == null &&
              item?.UserTask?.length > 0,
          ),
        ),
      });
    }
    const count = data.reduce((prev, cur) => prev + cur.data.length, 0);
    return { status: 200, dataItem, data, count };
  }
}
