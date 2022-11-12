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

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ProjectModule,
    GroupModule,
    ItemModule,
    TaskModule,
    UserProjectModule,
    UserGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
