import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserProjectController } from './user-project.controller';
import { UserProjectService } from './user-project.service';

@Module({
  controllers: [UserProjectController],
  providers: [UserProjectService],
  imports: [PrismaModule],
})
export class UserProjectModule {}
