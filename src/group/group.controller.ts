import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
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

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }
}
