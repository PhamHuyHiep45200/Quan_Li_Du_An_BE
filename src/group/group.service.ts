import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SearchAllGroupDto } from './dto/search-all.dto';
import { SearchUserGroup } from './dto/search-user.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateDeleteGroupDto } from './dto/updateDelete.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    console.log(createGroupDto);

    const user = await this.prisma.userProject.findFirst({
      where: { id_user: createGroupDto.id_user },
    });
    console.log(user);

    if (user?.role !== 'USER') {
      return await this.prisma.group.create({
        data: {
          id_project: createGroupDto.id_project,
          name: createGroupDto.name,
          startDate: createGroupDto.startDate,
          endDate: createGroupDto.endDate,
          personCreate: createGroupDto.personCreate,
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
    } else {
      return { message: 'Bạn không có quyền' };
    }
  }
  findAll() {
    return this.prisma.group.findMany();
  }
  async searchAll(searchAllGroupDto: SearchAllGroupDto) {
    const data = await this.prisma.group.findMany({
      where: {
        name: { contains: searchAllGroupDto.name },
      },
      include: { Project: true },
    });
    return { status: 200, data };
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
        deleteFlg: true,
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
    const data = await this.prisma.group.update({
      where: { id: id_group },
      data: { name: updateUserGroupDto.name },
    });
    return { status: 200, data };
  }
  async deleteGroup(
    id_group: number,
    updateDeleteGroupDto: UpdateDeleteGroupDto,
  ) {
    const data = await this.prisma.group.update({
      where: { id: id_group },
      data: { deleteFlg: updateDeleteGroupDto.status },
    });
    return { status: 200, data };
  }
}
