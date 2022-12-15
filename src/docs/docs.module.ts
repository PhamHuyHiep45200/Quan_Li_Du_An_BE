import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';

@Module({
  controllers: [DocsController],
  providers: [DocsService],
  imports: [PrismaModule],
})
export class DocsModule {}
