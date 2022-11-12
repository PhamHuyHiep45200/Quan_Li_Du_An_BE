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
        UserGroup: {
          create: {
            id_user: createGroupDto.id_user,
            status: 'APPROVED',
            role: 'ADMIN',
          },
        },
      },
    });
  }
  findAll() {
    return this.prisma.group.findMany();
  }
  async findId(idProject: number) {
    const group = await this.prisma.project.findFirst({
      include: { Group: { where: { id_project: idProject } } },
    });
    const user = await this.prisma.userProject.findMany({
      where: { id_project: idProject, status: 'APPROVED' },
      include: { User: true },
    });
    return { status: 200, group, user };
  }
}
