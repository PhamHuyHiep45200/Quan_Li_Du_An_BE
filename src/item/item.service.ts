import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.item.findMany();
  }
  findItemId(idGroup: number) {
    return this.prisma.item.findMany({
      where: {
        id_group: idGroup,
      },
    });
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
  async create(createItemDto: CreateItemDto) {
    return await this.prisma.item.create({
      data: {
        id_group: createItemDto.id_group,
        name: createItemDto.name,
        UserItem: {
          create: {
            id_user: createItemDto.id_user,
          },
        },
      },
    });
  }
}
