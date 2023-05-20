import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';

@Injectable()
export class ProjectService {
  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService) {}
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
      const query = await this.neo4jService.read(`match (p:project) return p`);
      let application = query.records.map((query) => query.get('p').properties);
      return application.length > 0
        ? { data: application, status: true, msg: response.SUCCESS }
        : { data: null, status: false, msg: response.error };
    } catch (error) {
      return error;
    }
  }

  async getproject(body: CreateProjectDto) {
    try {
      const query = await this.neo4jService.read(
        `match (p:project {projectName:"${body.projectName}"}) return p`,
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
}
