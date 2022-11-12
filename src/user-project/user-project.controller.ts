import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserProjectDto } from './dto/create-user-project.dto';
import { UpdateUserProjectDto } from './dto/update-user-project.dto';
import { UserProjectService } from './user-project.service';

@Controller('user-project')
@ApiTags('user-project')
export class UserProjectController {
  constructor(private readonly userProject: UserProjectService) {}
  @Post()
  createUserProject(@Body() createUserProject: CreateUserProjectDto) {
    return this.userProject.create(createUserProject);
  }
  @Get()
  getAll() {
    return this.userProject.finAll();
  }
  @Get('/notify/:id_user')
  getNotifyAccept(@Param('id_user') id_user: number) {
    return this.userProject.getNotifyAccep(id_user);
  }
  @Get(':id_project')
  getUsersProject(@Param('id_project', ParseIntPipe) id_project: number) {
    return this.userProject.getUsersProject(id_project);
  }
  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserProjectDto: UpdateUserProjectDto,
  ) {
    return await this.userProject.updateById(id, updateUserProjectDto);
  }
}
