import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChartService {
  constructor(private prisma: PrismaService) {}
  finAll() {
    return this.prisma.userItem.findMany();
  }
  async getChartItem(id: number) {
    const data = await this.prisma.userItem.findMany({
      where: { id_item: id },
      include: {
        User: {
          include: {
            UserTask: {
              include: {
                Task: { include: { UserTask: { include: { User: true } } } },
              },
            },
          },
        },
      },
    });
    const dataSubmit = [];
    data.map((da) => {
      const dataStatus = {
        OPEN: [],
        DOING: [],
        COMPLETED: [],
        ILLEGAL: [],
        PENDDING: [],
        done: 0,
        percentDone: 0,
        count: 0,
      };
      const dataFilterItem = da.User.UserTask.filter(
        (fil) => fil?.Task?.id_item === id,
      );
      dataFilterItem.map((task) => {
        dataStatus[task.Task.status].push(task.Task);
      });
      dataStatus.done = dataStatus.COMPLETED.length;
      const numberDone =
        (dataStatus.COMPLETED.length / dataFilterItem.length) * 100;
      dataStatus.percentDone = +numberDone.toFixed(0);
      dataStatus.count = dataFilterItem.length;
      dataSubmit.push({
        id: da.User.id,
        firstName: da.User.firstName,
        lastName: da.User.lastName,
        birthday: da.User.birthday,
        email: da.User.email,
        thumbnail: da.User.thumbnail,
        data: dataStatus,
      });
    });
    const countTask = await this.prisma.task.findMany({
      where: { id_item: id },
    });
    return { status: 200, data: dataSubmit, count: countTask.length };
  }
}
