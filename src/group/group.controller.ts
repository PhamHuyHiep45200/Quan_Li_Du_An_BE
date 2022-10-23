import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  getAllGroup() {
    return this.groupService.findAll();
  }
}
