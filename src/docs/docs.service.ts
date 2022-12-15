import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocs } from './dto/create-docs.dto';
import { UpdateDocs } from './dto/update-docs.dto';

@Injectable()
export class DocsService {
  constructor(private prisma: PrismaService) {}
  getAllDocs() {
    this.prisma.document.findMany();
  }
  async createDocs(createDocs: CreateDocs) {
    const data = await this.prisma.document.create({
      data: {
        data: createDocs.data,
        type: 'Docs',
        deleteFlg: false,
        projectId: createDocs.projectId ? createDocs.projectId : null,
        groupId: createDocs.groupId ? createDocs.groupId : null,
      },
    });
    return { status: 200, data };
  }
  updateDocs(id: number, updateDocs: UpdateDocs) {
    this.prisma.document.update({
      where: { id },
      data: updateDocs,
    });
  }
  deleteDocs(id: number) {
    this.prisma.document.update({
      where: { id },
      data: {
        deleteFlg: true,
      },
    });
  }
}
