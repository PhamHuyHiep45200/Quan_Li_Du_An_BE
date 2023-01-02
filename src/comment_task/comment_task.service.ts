import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentTaskDto } from './dto/create-comment_task.dto';
import { UpdateCommentTaskDto } from './dto/update-comment_task.dto';

@Injectable()
export class CommentTaskService {
  constructor(private prisma: PrismaService) {}
  getAllCommentTask() {
    const data = this.prisma.commentTask.findMany();
    return { status: 200, data };
  }
  async createCommentTask(createCommentTask: CreateCommentTaskDto) {
    const data = await this.prisma.commentTask.create({
      data: createCommentTask,
    });
    const UserComment = await this.prisma.user.findFirst({
      where: { id: createCommentTask.userId },
    });
    return { status: 200, data: { ...data, ...UserComment } };
  }
  async updateCommentTask(id: number, updateCommentTask: UpdateCommentTaskDto) {
    const data = await this.prisma.commentTask.update({
      where: { id },
      data: { content: updateCommentTask.content },
    });
    return { status: 200, data };
  }
  async deleteCommentTask(id: number) {
    const data = await this.prisma.commentTask.update({
      where: { id },
      data: { deleteFlg: true },
    });
    return { status: 200, data };
  }
  async getByIdCommentTask(id_task: number) {
    const data = await this.prisma.commentTask.findMany({
      where: { taskId: id_task, deleteFlg: false },
      orderBy: { createdAt: 'asc' },
      include: { UserComment: true },
    });
    const history = await this.prisma.history.findMany({
      where: { taskHistory: id_task },
      orderBy: { createdAt: 'asc' },
      include: { UserHistory: true },
    });
    return { status: 200, data, history };
  }
}
