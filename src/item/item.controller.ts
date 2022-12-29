import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { SearchAllItemDto } from './dto/search-all-item.dto';
import { SearchUser } from './dto/search-user.dto';
import { UpdateDeleteItemDto } from './dto/update-delete.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get()
  getAll() {
    return this.itemService.findAll();
  }
  @Get('/search-item')
  searchAllItem(@Query() searchAllItemDto: SearchAllItemDto) {
    return this.itemService.searchAll(searchAllItemDto);
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
  @Put('update/:id_item')
  updateGroup(
    @Param('id_item', ParseIntPipe) id_item: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.updateItem(id_item, updateItemDto);
  }
  @Put('delete/:id_item')
  deleteItem(
    @Param('id_item', ParseIntPipe) id_item: number,
    @Body() updateDeleteItemDto: UpdateDeleteItemDto,
  ) {
    return this.itemService.deleteItem(id_item, updateDeleteItemDto);
  }
}
