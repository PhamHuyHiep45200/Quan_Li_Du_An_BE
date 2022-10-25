import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.project.findMany();
  }
  async findId(idUser: number) {
    const projects = await this.prisma.project.findMany({
      where: {
        UserProject: { some: { id_user: idUser } },
      },
    });
    const groups = await this.prisma.group.findMany({
      where: {
        id_project: null,
        UserGroup: {
          some: { id_user: idUser },
        },
      },
    });
    const items = await this.prisma.item.findMany({
      where: {
        id_group: null,
        UserItem: {
          some: { id_user: idUser },
        },
      },
    });
    const tasks = await this.prisma.task.findMany({
      where: {
        id_item: null,
        UserTask: {
          some: { id_user: idUser },
        },
      },
    });
    return { project: projects, groups: groups, item: items, task: tasks };
  }
  async create(createProjectDto: CreateProjectDto) {
    return await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        createdAt: createProjectDto.createdAt,
        updatedAt: createProjectDto.updatedAt,
        UserProject: {
          create: {
            id_user: createProjectDto.id_user,
          },
        },
      },
    });
  }
}
