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
  async create(createItemDto: CreateItemDto) {
    return await this.prisma.item.create({
      data: {
        id_group: createItemDto.id_group,
        name: createItemDto.name,
        createdAt: createItemDto.createdAt,
        updatedAt: createItemDto.updatedAt,
        UserItem: {
          create: {
            id_user: createItemDto.id_user,
          },
        },
      },
    });
  }
}
