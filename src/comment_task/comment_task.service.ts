import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentTaskService {
  constructor(private prisma: PrismaService) {}
  getAllCommentTask() {
    this.prisma.commentTask.findMany();
  }
  createCommentTask() {
    this.prisma.commentTask.findMany();
  }
  updateCommentTask() {
    this.prisma.commentTask.findMany();
  }
  deleteCommentTask() {
    this.prisma.commentTask.findMany();
  }
  getByIdCommentTask() {
    this.prisma.commentTask.findMany();
  }
}
