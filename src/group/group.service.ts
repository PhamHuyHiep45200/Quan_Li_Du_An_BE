import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SearchUserGroup } from './dto/search-user.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

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
            type: 'group',
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

  async searchUserGroup(id_group: number, query: SearchUserGroup) {
    const userAll = await this.prisma.user.findMany({
      where: {
        email: { contains: query.q },
      },
    });
    const userProjects = await this.prisma.userGroup.findMany({
      where: { id_group, status: 'APPROVED' },
      include: { User: true },
    });
    const res = userAll.filter(
      (all) =>
        userProjects.filter((uPro) => uPro.User.id === all.id).length === 0,
    );
    return { status: 200, res };
  }
  async updateGroup(id_group: number, updateUserGroupDto: UpdateGroupDto) {
    const data = this.prisma.group.update({
      where: { id: id_group },
      data: { name: updateUserGroupDto.name },
    });
    return { status: 200, data };
  }
  async deleteGroup(id_group: number) {
    const data = this.prisma.group.update({
      where: { id: id_group },
      data: { deleteFlg: true },
    });
    return { status: 200, data };
  }
}
