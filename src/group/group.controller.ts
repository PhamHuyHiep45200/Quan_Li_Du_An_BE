import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { SearchAllGroupDto } from './dto/search-all.dto';
import { SearchUserGroup } from './dto/search-user.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateDeleteGroupDto } from './dto/updateDelete.dto';
import { GroupService } from './group.service';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  getAllGroup() {
    return this.groupService.findAll();
  }
  @Get('/search-group')
  searchAllGroup(@Query() searchAllDto: SearchAllGroupDto) {
    return this.groupService.searchAll(searchAllDto);
  }

  @Get('/:idProject')
  getGroupId(@Param('idProject', ParseIntPipe) idProject: number) {
    return this.groupService.findId(idProject);
  }

  @Get('search-user/:id_group')
  searchUserGroup(
    @Param('id_group', ParseIntPipe) id_group: number,
    @Query() query: SearchUserGroup,
  ) {
    return this.groupService.searchUserGroup(id_group, query);
  }

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }
  @Put('update/:id_group')
  updateGroup(
    @Param('id_group', ParseIntPipe) id_group: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(id_group, updateGroupDto);
  }
  @Put('delete/:id_group')
  deleteGroup(
    @Param('id_group', ParseIntPipe) id_group: number,
    @Body() updateDeleteGroupDto: UpdateDeleteGroupDto,
  ) {
    return this.groupService.deleteGroup(id_group, updateDeleteGroupDto);
  }
}
