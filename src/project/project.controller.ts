import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { QuerySearchUser } from './dto/search-user.dto';
import { ProjectService } from './project.service';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  getAll() {
    return this.projectService.findAll();
  }
  @Get('/:idUser')
  getProjectId(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.projectService.findId(idUser);
  }
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
  @Get('/search-user/:id_project')
  searchUserProject(
    @Param('id_project', ParseIntPipe) id_project: number,
    @Query() query: QuerySearchUser,
  ) {
    return this.projectService.searchUserProject(id_project, query);
  }
  @Get('/notify/:id_user')
  getNotifyAccept(@Param('id_user') id_user: number) {
    return this.projectService.getNotifyAccep(id_user);
  }
}
