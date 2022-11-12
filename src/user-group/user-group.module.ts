import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserGroupController } from './user-group.controller';
import { UserGroupService } from './user-group.service';

@Module({
  controllers: [UserGroupController],
  providers: [UserGroupService],
  imports: [PrismaModule],
})
export class UserGroupModule {}
