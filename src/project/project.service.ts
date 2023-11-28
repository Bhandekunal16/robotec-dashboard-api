import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';
import { CommonService } from 'src/common/common.service';
import { getAllProject } from './dto/getall-project.dto';
import { editProject } from './dto/edit-project.dto';
import { deleteProject } from './dto/delete-project.dto';
import { getProject } from './dto/get-project.dto';

import { convertArrayToBinary } from 'src/data/descriptor';

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
          Date: new Date().getDate(),
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('p')['properties'],
            status: true,
            msg: response.SUCCESS + 'project created successfully',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'failed to create project',
          };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getAllProject(email: getAllProject) {
    try {
      const query = await this.neo4jService.read(
        `match (u: user {email: $email})-[:HAS_PROJECT]->(p:project) return p`,
        { email: email },
      );
      const data = query.records.map((query) => query.get('p').properties);

      const encrypt = await convertArrayToBinary(data);

      Logger.log(encrypt);

      return query.records.length > 0
        ? {
            encrypt: encrypt,
            data: data,
            status: true,
            msg: response.SUCCESS + 'project found.',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'project not found',
          };
    } catch (error) {
      Logger.error('error' + error, 'project.service.ts');
      return { res: error, status: false, msg: response.ERROR };
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
            msg: response.SUCCESS + 'project edited successfully',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'project not found',
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
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
      return {
        status: true,
        msg: response.SUCCESS + 'project deleted successfully',
      };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getCount() {
    try {
      const match = await this.common.matchNode('project');
      return match.status
        ? await this.common.count2('project')
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'we do not have any project',
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
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
      return { res: error, status: false, msg: response.ERROR };
    }
  }
}
