import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserProjectDto } from './dto/create-user-project.dto';
import { UpdateUserProjectDto } from './dto/update-user-project.dto';

@Injectable()
export class UserProjectService {
  constructor(private prisma: PrismaService) {}
  async create(createUserProject: CreateUserProjectDto) {
    const userCreate = await this.prisma.userProject.findFirst({
      where: { id_user_parent: createUserProject.id_user_parent },
    });
    if (userCreate && userCreate.role === 'ADMIN') {
      const user_project = await this.prisma.userProject.findFirst({
        where: {
          id_project: createUserProject.id_project,
          id_user: createUserProject.id_user,
        },
      });
      // if (user_project) {
      //   return await this.prisma.userProject.update({
      //     where: {
      //       id: user_project.id,
      //     },
      //     data: {
      //       status: 'PENDDING',
      //     },
      //   });
      // }
      // return this.prisma.userProject.create({
      //   data: { ...createUserProject, type: 'project' },
      // });
      const data = await this.prisma.userProject.upsert({
        where: { id: user_project.id },
        update: {
          status: 'PENDDING',
        },
        create: { ...createUserProject, type: 'project' },
      });
      return { status: 200, data };
    }
    return {
      status: 401,
      message: 'Bạn không có quyền thực hiện hành động này',
    };
  }
  finAll() {
    return this.prisma.userProject.findMany();
  }
  async getUsersProject(id_project: number) {
    const data = await this.prisma.userProject.findMany({
      where: { id_project, status: 'APPROVED' },
      include: { User: true },
    });
    return { status: 200, data };
  }
  async updateById(id: number, updateUserProjectDto: UpdateUserProjectDto) {
    const user = await this.prisma.userProject.findFirst({
      where: { id: updateUserProjectDto.id_user },
    });
    let data = {};
    if (user && user.role === 'ADMIN') {
      data = await this.prisma.userProject.update({
        where: {
          id,
        },
        data: {
          status: updateUserProjectDto.status,
        },
      });
    } else {
      return {
        status: 401,
        message: 'Bạn không có quyền thực hiện hành động này',
      };
    }
    return { status: 200, data };
  }
}
