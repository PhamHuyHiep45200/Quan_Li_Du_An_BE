import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';
import { SearchAllDto } from './dto/search-all.dto';
import { QuerySearchUser } from './dto/search-user.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  getAll() {
    return this.projectService.findAll();
  }
  @Get()
  searchAll(@Body() searchAllDto: SearchAllDto) {
    return this.projectService.searchAll(searchAllDto);
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
  @Put('/update/:id_project')
  updateProject(
    @Param('id_project') id_project: number,
    @Body() updateProject: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id_project, updateProject);
  }
  @Put('/delete/:id_project')
  deleteProject(
    @Param('id_project') id_project: number,
    @Body() deleteProjectDto: DeleteProjectDto,
  ) {
    return this.projectService.deleteProject(id_project, deleteProjectDto);
  }
}
