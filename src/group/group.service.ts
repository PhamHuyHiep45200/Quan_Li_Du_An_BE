import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    return await this.prisma.group.create({
      data: {
        id_project: createGroupDto.id_project,
        name: createGroupDto.name,
        createdAt: createGroupDto.createdAt,
        updatedAt: createGroupDto.updatedAt,
        UserGroup: {
          create: {
            id_user: createGroupDto.id_user,
          },
        },
      },
    });
  }
  findAll() {
    return this.prisma.group.findMany({});
  }
  findId(idProject: number) {
    return this.prisma.group.findMany({
      where: {
        id_project: idProject,
      },
    });
  }
}
