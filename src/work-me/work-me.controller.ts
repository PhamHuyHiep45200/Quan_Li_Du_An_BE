import { Controller, Get, ParseIntPipe, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkMeService } from './work-me.service';

@Controller('work-me')
@ApiTags('work-me')
export class WorkMeController {
  constructor(private workMeService: WorkMeService) {}
  @Get('/:id')
  getWorkMe(@Param('id', ParseIntPipe) id: number) {
    return this.workMeService.getAll(id);
  }
}
