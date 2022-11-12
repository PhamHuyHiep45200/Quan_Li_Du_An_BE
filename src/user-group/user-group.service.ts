import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserGroupService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    this.prisma.userGroup.findMany();
  }
  async addUserGroup(createUserGroupDto) {
    const userProject = await this.prisma.userProject.findFirst({
      where: { id_user: createUserGroupDto.id_user, status: 'APPROVED' },
    });
    const data = await this.prisma.userGroup.create({
      data: {
        id_user: createUserGroupDto.id_user,
        status: userProject ? 'APPROVED' : 'PENDDING',
        role: createUserGroupDto.role,
        id_group: createUserGroupDto.id_group,
        id_user_parent: createUserGroupDto.id_user_parent,
      },
    });
    return { status: 200, data };
  }
  updateUserGroup(id, updateUserGroupDto) {
    const data = this.prisma.userGroup.update({
      where: { id },
      data: { status: updateUserGroupDto.status },
    });
    return { status: 200, data };
  }
}
