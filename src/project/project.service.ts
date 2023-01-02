import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';
import { SearchAllDto } from './dto/search-all.dto';
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
      where: { id_user: idUser, status: 'APPROVED' },
      include: {
        Project: {
          include: {
            Group: {
              include: {
                Item: { where: { deleteFlg: false } },
                Document: true,
              },
              where: { deleteFlg: false },
            },
            Document: true,
          },
        },
      },
    });
    const data = [];
    res.map((da) => {
      if (!da.Project.deleteFlg) {
        data.push(da.Project);
      }
    });
    return { status: 200, data };
  }
  async searchAll(searchAllDto: SearchAllDto) {
    const data = await this.prisma.project.findMany({
      where: {
        name: { contains: searchAllDto.name },
      },
    });
    return { status: 200, data };
  }

  async create(createProjectDto: CreateProjectDto) {
    return await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        startDate: createProjectDto.startDate,
        endDate: createProjectDto.endDate,
        personCreate: createProjectDto.personCreate,
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
        deleteFlg: false,
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
  async deleteProject(id_project: number, deleteProjectDto: DeleteProjectDto) {
    const data = await this.prisma.project.update({
      where: { id: id_project },
      data: { deleteFlg: deleteProjectDto.status },
    });
    return { status: 200, data };
  }
}
