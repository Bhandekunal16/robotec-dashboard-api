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
  async createProject(@Body() body: CreateProjectDto) {
    return await this.projectService.createProject(body);
  }

  @Post(project.editProject)
  async EditProject(@Body() body: editProject) {
    return await this.projectService.editProject(body);
  }

  @Post(project.deleteProject)
  async deleteProject(@Body() body: deleteProject) {
    return await this.projectService.deleteProject(body);
  }

  @Get('getallproject/:email')
  async getProjectById(@Param('email') email: getAllProject) {
    return await this.projectService.getAllProject(email);
  }

  @Get('count/:email')
  async count(@Param('email') email: any) {
    return await this.projectService.getCount(email);
  }

  @Post(project.getProject)
  async getProject(@Body() body: getProject) {
    return await this.projectService.getProject(body);
  }
}
