import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    const createGroup = await this.prisma.group.create({
      data: {
        id_project: createGroupDto.id_project
          ? createGroupDto.id_project
          : null,
        name: createGroupDto.name,
        createdAt: createGroupDto.createdAt,
        updatedAt: createGroupDto.updatedAt,
      },
    });
    if (createGroup) {
      this.prisma.userGroup.create({
        data: {
          id_user: createGroupDto.id_user,
          id_group: createGroup.id,
        },
      });
    }
    return { createGroup };
  }
  findAll() {
    return this.prisma.group.findMany({});
  }
}
