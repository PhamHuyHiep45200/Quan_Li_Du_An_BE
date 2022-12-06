import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGrouptDto } from './dto/update-user-group.dto';

@Injectable()
export class UserGroupService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.userGroup.findMany({});
  }
  async addUserGroup(createUserGroupDto: CreateUserGroupDto) {
    const userCreate = await this.prisma.userGroup.findFirst({
      where: { id_user_parent: createUserGroupDto.id_user_parent },
    });
    if (userCreate && userCreate.role !== 'USER') {
      const user_group = await this.prisma.userGroup.findFirst({
        where: {
          id_group: createUserGroupDto.id_group,
          id_user: createUserGroupDto.id_user,
        },
      });
      const data = await this.prisma.userGroup.upsert({
        where: { id: user_group.id },
        update: {
          status: 'PENDDING',
        },
        create: {
          id_user: createUserGroupDto.id_user,
          status: 'APPROVED',
          role: createUserGroupDto.role,
          id_group: createUserGroupDto.id_group,
          id_user_parent: createUserGroupDto.id_user_parent,
          type: 'group',
        },
      });
      return { status: 200, data };
    }
    return {
      status: 401,
      message: 'Bạn không có quyền thực hiện hành động này',
    };
  }
  async getUsersGroup(id_group: number) {
    const data = await this.prisma.userGroup.findMany({
      where: { id_group, status: 'APPROVED' },
      include: { User: true },
    });
    return { status: 200, data };
  }
  async updateUserGroup(id: number, updateUserGroupDto: UpdateUserGrouptDto) {
    const user = await this.prisma.userGroup.findFirst({
      where: { id: updateUserGroupDto.id_user_update },
    });
    let data = {};
    if (user && user.role !== 'USER') {
      data = await this.prisma.userGroup.update({
        where: {
          id,
        },
        data: {
          status: updateUserGroupDto.status,
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
  async searchGroup(id_project: number) {
    const data = await this.prisma.userProject.findMany({
      where: { id_project: id_project },
      include: { User: true },
    });
    return { status: 200, data };
  }
}
