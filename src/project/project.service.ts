import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.project.findMany();
  }
  async create(createProjectDto: CreateProjectDto) {
    const createProject = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        createdAt: createProjectDto.createdAt,
        updatedAt: createProjectDto.updatedAt,
      },
    });
    if (createProject) {
      this.prisma.userProject.create({
        data: {
          id_user: createProjectDto.id_user,
          id_project: createProject.id,
        },
      });
    }
    return { createProject };
  }
}
