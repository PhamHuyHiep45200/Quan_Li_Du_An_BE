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
  @Put(':id')
  updateUserGroup(
    @Param('id', ParseIntPipe) id: number,
    updateUserGroupDto: UpdateUserGrouptDto,
  ) {
    return this.userGroupService.updateUserGroup(id, updateUserGroupDto);
  }
}
