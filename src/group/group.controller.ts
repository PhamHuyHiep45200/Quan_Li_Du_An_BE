import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { SearchUserGroup } from './dto/search-user.dto';
import { GroupService } from './group.service';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  getAllGroup() {
    return this.groupService.findAll();
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
}
