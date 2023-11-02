import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';
import { CommonService } from 'src/common/common.service';
import { getAllProject } from './dto/getall-project.dto';
import { editProject } from './dto/edit-project.dto';
import { deleteProject } from './dto/delete-project.dto';
import { getProject } from './dto/get-project.dto';
import { time } from 'robotic-time';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(Neo4jService) private neo4jService: Neo4jService,
    private common: CommonService,
  ) {}

  async createProject(body: CreateProjectDto) {
    try {
      console.log(body);
      const query = await this.neo4jService.write(
        `match (u: user { email: $email})
        merge (u)-[:HAS_PROJECT]->(p:project {projectName: $projectName,codeIn: $codeIn, Date: $Date}) return p`,
        {
          email: body.data.email,
          projectName: body.data.projectName,
          codeIn: body.data.codeIn,
          Date: time().date,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('p')['properties'],
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: response.error };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.error };
    }
  }

  async getAllProject(email: getAllProject) {
    try {
      const query = await this.neo4jService.read(
        `match (u: user {email: $email})-[:HAS_PROJECT]->(p:project) return p`,
        { email: email },
      );
      const data = query.records.map((query) => query.get('p').properties);
      return query.records.length > 0
        ? {
            data: data,
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: 'false' };
    } catch (error) {
      return { res: error, status: false, msg: response.error };
    }
  }

  async editProject(body: editProject) {
    try {
      console.log(body);
      const query = await this.neo4jService.write(
        `match (u: user { email: $email})-[:HAS_PROJECT]->(p:project {projectName: $projectName}) 
        set p.codeIn=$codeIn
        return p`,
        {
          email: body.data.email,
          projectName: body.data.projectName,
          codeIn: body.data.codeIn,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('p')['properties'],
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: response.error };
    } catch (error) {
      return { res: error, status: false, msg: response.error };
    }
  }

  async deleteProject(body: deleteProject) {
    try {
      console.log(body);
      const query = await this.neo4jService.write(
        `match (u: user { email: $email})-[:HAS_PROJECT]->(p:project {projectName: $projectName}) 
        detach delete p`,
        {
          email: body.data.email,
          projectName: body.data.projectName,
        },
      );
      return { status: true, msg: response.SUCCESS };
    } catch (error) {
      return { res: error, status: false, msg: response.error };
    }
  }

  async getCount() {
    try {
      const match = await this.common.matchNode('project');
      return match.status
        ? await this.common.count2('project')
        : { data: null, status: false, msg: 'false' };
    } catch (error) {
      return error;
    }
  }

  async getProject(body: getProject) {
    try {
      const query = await this.common.matchNodeProperty(
        'project',
        'projectName',
        body.projectName,
      );
      return query;
    } catch (error) {
      return error;
    }
  }
}
