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
import { MailService } from './mail/mail.service';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail/mail.controller';
import { EventsModule } from './event/events.module';
import { DocsModule } from './docs/docs.module';
import { CommentTaskModule } from './comment_task/comment_task.module';

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
  ],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
