import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocs } from './dto/create-docs.dto';
import { UpdateDocs } from './dto/update-docs.dto';

@Injectable()
export class DocsService {
  constructor(private prisma: PrismaService) {}
  async getAllDocs() {
    const data = await this.prisma.document.findMany();
    return { status: 200, data };
  }
  async getDocsById(id: number) {
    const data = await this.prisma.document.findFirst({
      where: { id },
    });
    return { status: 200, data };
  }
  async createDocs(createDocs: CreateDocs) {
    const data = await this.prisma.document.create({
      data: {
        name: createDocs.name,
        data: createDocs.data,
        typeName: 'Docs',
        deleteFlg: false,
        projectId: createDocs.projectId ? createDocs.projectId : null,
        groupId: createDocs.groupId ? createDocs.groupId : null,
      },
    });
    return { status: 200, data };
  }
  async updateDocs(id: number, updateDocs: UpdateDocs) {
    const data = await this.prisma.document.update({
      where: { id },
      data: updateDocs,
    });
    return { status: 200, data };
  }
  async deleteDocs(id: number) {
    const data = await this.prisma.document.update({
      where: { id },
      data: {
        deleteFlg: true,
      },
    });
    return { status: 200, data };
  }
}
