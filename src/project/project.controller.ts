import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { project } from 'src/route/routes';

@Controller(project.Controller)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post(project.AddProject)
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get(project.GetAllProject)
  getAllproject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.getAllproject(createProjectDto);
  }

  @Get(project.getCount)
  getCount(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.getCount(createProjectDto);
  }

  @Post(project.getProject)
  getproject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.getproject(createProjectDto);
  }
  // @Get()
  // findAll() {
  //   return this.projectService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectService.update(+id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectService.remove(+id);
  // }
}
