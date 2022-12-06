import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/event/events.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, EventsGateway],
  imports: [PrismaModule],
})
export class TaskModule {}
