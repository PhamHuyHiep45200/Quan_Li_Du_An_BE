import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  getAll() {
    return this.projectService.findAll();
  }
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    this.projectService.create(createProjectDto);
  }
}
