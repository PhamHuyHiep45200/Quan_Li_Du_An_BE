import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { QuerySearchUser } from './dto/search-user.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.project.findMany();
  }
  async findId(idUser: number) {
    const projects = await this.prisma.project.findMany({
      where: { UserProject: { some: { id_user: idUser, status: 'APPROVED' } } },
      include: { UserProject: { include: { User: true } } },
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
    return {
      status: 200,
      data: [
        {
          type: 'PROJECT',
          name: 'project',
          data: projects,
        },
        {
          type: 'GROUP',
          name: 'group',
          data: groups,
        },
        {
          type: 'ITEM',
          name: 'item',
          data: items,
        },
        {
          type: 'TASK',
          name: 'task',
          data: tasks,
        },
      ],
    };
  }
  async create(createProjectDto: CreateProjectDto) {
    return await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        UserProject: {
          create: {
            id_user: createProjectDto.id_user,
            status: 'APPROVED',
            role: 'ADMIN',
            type: 'project',
          },
        },
      },
    });
  }
  async searchUserProject(id_project: number, query: QuerySearchUser) {
    const userAll = await this.prisma.user.findMany({
      where: {
        email: { contains: query.q },
      },
    });
    const userProjects = await this.prisma.userProject.findMany({
      where: { id_project, status: 'APPROVED' },
      include: { User: true },
    });
    const res = userAll.filter(
      (all) =>
        userProjects.filter((uPro) => uPro.User.id === all.id).length === 0,
    );
    return { status: 200, res };
  }
  async getNotifyAccep(id_user: number) {
    const dataProject = await this.prisma.userProject.findMany({
      where: {
        id_user,
        status: 'PENDDING',
      },
      include: { User: true, UserParent: true },
    });
    const dataGroup = await this.prisma.userGroup.findMany({
      where: { id_user, status: 'PENDDING' },
      include: { User: true },
    });
    return { status: 200, dataProject, dataGroup };
  }
}
