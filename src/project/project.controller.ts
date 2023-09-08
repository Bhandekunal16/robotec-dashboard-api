import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { project } from 'src/routes/routes';

@Controller(project.Controller)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post(project.AddProject)
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get(project.GetAllProject)
  getAllProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.getAllProject(createProjectDto);
  }

  @Get(project.getCount)
  getCount(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.getCount(createProjectDto);
  }

  @Post(project.getProject)
  getProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.getProject(createProjectDto);
  }
}
