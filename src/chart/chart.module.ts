import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';

@Module({
  controllers: [ChartController],
  providers: [ChartService],
  imports: [PrismaModule],
})
export class ChartModule {}
