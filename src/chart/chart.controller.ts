import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChartService } from './chart.service';

@ApiTags('chart')
@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}
  @Get()
  getAll() {
    return this.chartService.finAll();
  }

  @Get('/:id')
  getChartItem(@Param('id', ParseIntPipe) id: number) {
    return this.chartService.getChartItem(id);
  }

  @Get('/statistic/full')
  getFull() {
    return this.chartService.getFullStatistic();
  }
}
