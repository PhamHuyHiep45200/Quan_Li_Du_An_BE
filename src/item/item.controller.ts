import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { SearchUser } from './dto/search-user.dto';
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
  @Get('get-user-group/:id_item')
  searchUsers(
    @Param('id_item', ParseIntPipe) id_item: number,
    @Query() query: SearchUser,
  ) {
    return this.itemService.searchUsers(id_item, query);
  }
  @Get('get-all-user-group/:id_item')
  searchUsersAll(@Param('id_item', ParseIntPipe) id_item: number) {
    return this.itemService.searchUsersAll(id_item);
  }
  @Post()
  createProject(@Body() createProjectDto: CreateItemDto) {
    return this.itemService.create(createProjectDto);
  }
}
