import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { QuerySearchUser } from './dto/search-user.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.project.findMany();
  }
  async findId(idUser: number) {
    const res = await this.prisma.userProject.findMany({
      where: { id_user: idUser },
      include: { Project: { include: { Group: { include: { Item: true } } } } },
    });
    const data = [];
    res.map((da) => {
      data.push(da.Project);
    });
    return { status: 200, data };
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
      include: { User: true, UserParent: true, Project: true },
    });
    const dataGroup = await this.prisma.userGroup.findMany({
      where: { id_user, status: 'PENDDING' },
      include: { User: true, UserParent: true, Group: true },
    });
    const data = [...dataProject, ...dataGroup];
    return { status: 200, data };
  }
  async updateProject(id_project: number, updateProject: UpdateProjectDto) {
    const data = await this.prisma.project.update({
      where: { id: id_project },
      data: {
        name: updateProject.name,
      },
    });
    return { status: 200, data };
  }
  async deleteProject(id_project: number) {
    const data = await this.prisma.project.update({
      where: { id: id_project },
      data: { deleteFlg: true },
    });
    return { status: 200, data };
  }
}
