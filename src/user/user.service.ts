import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    const data = await this.prisma.user.findMany({});
    return { status: 200, data };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async searchUser(search: SearchUserDto) {
    const data = await this.prisma.user.findMany({
      where: {
        email: {
          contains: search.q,
        },
      },
    });
    return { status: 200, data };
  }

  async getUserProjectAll(id_project: number) {
    const data = await this.prisma.project.findMany({
      where: { id: id_project },
      include: {
        UserProject: {
          include: {
            User: { include: { UserGroup: { include: { Group: true } } } },
          },
        },
      },
    });
    return { status: 200, data };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
