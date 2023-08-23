import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';
import { GetProject, GetProjectCount } from 'src/query/query';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class ProjectService {
  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService, private common: CommonService) {}
  async createProject(body: CreateProjectDto) {
    try {
      const query = await this.neo4jService.write(
        `merge (p:project {projectName:"${body.projectName}",codeIn:"${
          body.codeIn
        }",Date:"${new Date().getDate()}"}) return p`,
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('p')['properties'],
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: response.error };
    } catch (error) {
      return error;
    }
  }

  async getAllproject(createProjectDto: CreateProjectDto) {
    try {
      const query = await this.common.matchNode('project')
      return query
    } catch (error) {
      return error;
    }
  }

  async getCount(createProjectDto: CreateProjectDto) {
    try {
      const query = await this.common.count('youtube','type','vedio')
      return query
    } catch (error) {
      return error;
    }
  }

  async getproject(body: CreateProjectDto) {
    try {
      const query = await this.common.matchNodeProperty('project','projectName',body.projectName)
      return query
    } catch (error) {
      return error;
    }
  }
}
