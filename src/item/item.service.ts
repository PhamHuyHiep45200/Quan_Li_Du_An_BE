import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    this.prisma.project.findMany();
  }
  async create(createItemDto: CreateItemDto) {
    const createProject = await this.prisma.item.create({
      data: {
        id_group: createItemDto.id_group ? createItemDto.id_group : null,
        name: createItemDto.name,
        createdAt: createItemDto.createdAt,
        updatedAt: createItemDto.updatedAt,
      },
    });
    if (createProject) {
      this.prisma.userProject.create({
        data: {
          id_user: createItemDto.id_user,
          id_project: createProject.id,
        },
      });
    }
    return { createProject };
  }
}
