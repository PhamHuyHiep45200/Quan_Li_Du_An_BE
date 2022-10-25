import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get()
  getAll() {
    return this.itemService.findAll();
  }
  @Get('/:idGroup')
  getItemId(@Param('idGroup', ParseIntPipe) idGroup: number) {
    return this.itemService.findItemId(idGroup);
  }
  @Post()
  createProject(@Body() createProjectDto: CreateItemDto) {
    return this.itemService.create(createProjectDto);
  }
}
