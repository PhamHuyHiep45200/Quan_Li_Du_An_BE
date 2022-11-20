import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.item.findMany();
  }
  async findItemId(idGroup: number) {
    const item = await this.prisma.group.findFirst({
      where: { id: idGroup },
      include: { Item: { where: { id_group: idGroup } } },
    });
    const user = await this.prisma.userGroup.findMany({
      where: { id_group: idGroup, status: 'APPROVED' },
      include: { User: true },
    });
    return { status: 200, item, user };
  }
  async searchUsers(id_item, query) {
    let data = [];
    const datas = await this.prisma.item.findFirst({
      where: { id: id_item },
      include: {
        Group: {
          include: {
            UserGroup: {
              include: {
                User: true,
              },
              where: { status: 'APPROVED' },
            },
          },
        },
      },
    });
    if (data) {
      data = datas.Group.UserGroup.filter((user) =>
        user.User.email.includes(query.q),
      );
    }
    return { status: 200, data };
  }
  async searchUsersAll(id_item: number) {
    const data = await this.prisma.item.findFirst({
      where: { id: id_item },
      include: {
        Group: {
          include: {
            UserGroup: {
              include: {
                User: true,
              },
              where: { status: 'APPROVED' },
            },
          },
        },
      },
    });
    return { status: 200, data };
  }
  async create(createItemDto: CreateItemDto) {
    return await this.prisma.item.create({
      data: {
        id_group: createItemDto.id_group,
        name: createItemDto.name,
        // UserItem: {
        //   create: {
        //     id_user: createItemDto.id_user,
        //   },
        // },
      },
    });
  }
  async updateItem(id_item: number, updateItemDto: UpdateItemDto) {
    const data = this.prisma.item.update({
      where: { id: id_item },
      data: { name: updateItemDto.name },
    });
    return { status: 200, data };
  }
  async deleteItem(id_item: number) {
    const data = this.prisma.item.update({
      where: { id: id_item },
      data: { deleteFlg: true },
    });
    return { status: 200, data };
  }
}
