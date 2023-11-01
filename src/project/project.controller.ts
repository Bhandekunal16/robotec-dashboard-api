import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { project } from 'src/routes/routes';
import { getProject } from './dto/get-project.dto';
import { editProject } from './dto/edit-project.dto';
import { deleteProject } from './dto/delete-project.dto';
import { getAllProject } from './dto/getall-project.dto';

@Controller(project.Controller)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post(project.AddProject)
  createProject(@Body() body: CreateProjectDto) {
    return this.projectService.createProject(body);
  }

  @Post('edit')
  EditProject(@Body() body: editProject) {
    return this.projectService.editProject(body);
  }

  @Post('delete')
  deleteProject(@Body() body: deleteProject) {
    return this.projectService.deleteProject(body);
  }

  @Get('getallproject/:email')
  getProjectById(@Param('email') email: getAllProject) {
    return this.projectService.getAllProject(email);
  }

  @Post(project.getProject)
  getProject(@Body() body: getProject) {
    return this.projectService.getProject(body);
  }
}
