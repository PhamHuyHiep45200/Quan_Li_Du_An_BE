import { Module } from '@nestjs/common';
import { CommentTaskService } from './comment_task.service';
import { CommentTaskController } from './comment_task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CommentTaskService],
  controllers: [CommentTaskController],
  imports: [PrismaModule],
})
export class CommentTaskModule {}
