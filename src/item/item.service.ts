import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.item.findMany();
  }
  async create(createItemDto: CreateItemDto) {
    const createItem = await this.prisma.item.create({
      data: {
        id_group: createItemDto.id_group ? createItemDto.id_group : null,
        name: createItemDto.name,
        createdAt: createItemDto.createdAt,
        updatedAt: createItemDto.updatedAt,
      },
    });
    if (createItem) {
      this.prisma.userItem.create({
        data: {
          id_user: createItemDto.id_user,
          id_item: createItem.id,
        },
      });
    }
    return { createItem };
  }
}
