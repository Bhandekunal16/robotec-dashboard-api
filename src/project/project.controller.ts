import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Post('edit')
  EditProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.editProject(createProjectDto);
  }

  @Post('delete')
  deleteProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.deleteProject(createProjectDto);
  }

  @Get('getallproject/:email')
  getProjectById(@Param('email') email: string) {
    return this.projectService.getAllProject(email);
  }

  @Post(project.getProject)
  getProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.getProject(createProjectDto);
  }
}
