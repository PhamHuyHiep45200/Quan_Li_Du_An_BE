import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkMeController } from './work-me.controller';
import { WorkMeService } from './work-me.service';

@Module({
  controllers: [WorkMeController],
  providers: [WorkMeService],
  imports: [PrismaModule],
})
export class WorkMeModule {}
