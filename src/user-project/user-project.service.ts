import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserProjectDto } from './dto/create-user-project.dto';
import { UpdateUserProjectDto } from './dto/update-user-project.dto';

@Injectable()
export class UserProjectService {
  constructor(private prisma: PrismaService) {}
  create(createUserProject: CreateUserProjectDto) {
    return this.prisma.userProject.create({
      data: createUserProject,
    });
  }
  finAll() {
    return this.prisma.userProject.findMany();
  }
  async getNotifyAccep(id_user: number) {
    const data = await this.prisma.userProject.findMany({
      where: { id_user, status: 'PENDDING' },
    });
    return { status: 200, data };
  }
  async getUsersProject(id_project: number) {
    const data = await this.prisma.userProject.findMany({
      where: { id_project, status: 'APPROVED' },
    });
    return { status: 200, data };
  }
  async updateById(id: number, updateUserProjectDto: UpdateUserProjectDto) {
    return await this.prisma.userProject.update({
      where: {
        id,
      },
      data: {
        status: updateUserProjectDto.status,
      },
    });
  }
}
