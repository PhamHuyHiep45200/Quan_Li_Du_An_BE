import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { GroupModule } from './group/group.module';
import { ItemModule } from './item/item.module';
import { TaskModule } from './task/task.module';
import { UserProjectModule } from './user-project/user-project.module';
import { UserGroupModule } from './user-group/user-group.module';
import { UserItemModule } from './user_item/user_item.module';
import { ChartModule } from './chart/chart.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './event/events.module';
import { DocsModule } from './docs/docs.module';
import { CommentTaskModule } from './comment_task/comment_task.module';
import { WorkMeModule } from './work-me/work-me.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule,
    ProjectModule,
    GroupModule,
    ItemModule,
    TaskModule,
    UserProjectModule,
    UserGroupModule,
    UserItemModule,
    ChartModule,
    EventsModule,
    DocsModule,
    CommentTaskModule,
    WorkMeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
