import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGrouptDto } from './dto/update-user-group.dto';
import { UserGroupService } from './user-group.service';

@ApiTags('user-group')
@Controller('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Get()
  getAll() {
    return this.userGroupService.getAll();
  }
  @Post()
  addUserGroup(@Body() createUserGroupDto: CreateUserGroupDto) {
    return this.userGroupService.addUserGroup(createUserGroupDto);
  }
  @Get(':id_group')
  getUsersProject(@Param('id_group', ParseIntPipe) id_group: number) {
    return this.userGroupService.getUsersGroup(id_group);
  }
  @Get('/item/:id_item')
  getUsersGroupFromItem(@Param('id_item', ParseIntPipe) id_item: number) {
    return this.userGroupService.getUsersGroupFromItem(id_item);
  }
  @Get('search-group/:id_project')
  searchGroup(@Param('id_project', ParseIntPipe) id_project: number) {
    return this.userGroupService.searchGroup(id_project);
  }
  @Put(':id')
  updateUserGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserGroupDto: UpdateUserGrouptDto,
  ) {
    return this.userGroupService.updateUserGroup(id, updateUserGroupDto);
  }
}
