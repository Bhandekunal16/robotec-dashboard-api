import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { response } from 'src/constant/response';
import { Neo4jService } from 'nest-neo4j/dist';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Neo4jService) private neo4jService: Neo4jService,
    private common: CommonService,
  ) {}
  async register(body: any) {
    try {
      Logger.verbose(body);
      const query = await this.neo4jService.write(
        `merge (m:user {email: $email, password: $password, phoneNumber: $phoneNumber, type: $type}) return m`,
        {
          email: body.data.email,
          password: body.data.password,
          phoneNumber: body.data.phoneNumber,
          type: body.data.type,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('m')['properties'],
            msg: response.SUCCESS,
            status: true,
          }
        : { data: null, msg: response.error, status: false };
    } catch (error) {
      Logger.error(error);
      return { res: error, status: false, msg: response.error };
    }
  }

  async login(body: any) {
    try {
      console.log(body);
      const query = await this.neo4jService.read(
        `match (u: user {email: $email, password: $password}) return u`,
        { email: body.data.email, password: body.data.password },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('u')['properties'],
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: 'false' };
    } catch (error) {
      console.log(error);

      return { res: error, status: false, msg: response.error };
    }
  }

  async AddTask(body: any) {
    try {
      const query = await this.neo4jService.write(
        `match (u: user {email: $email})
        merge (u)-[:has_task]->(t:task {name: $name, type: $type, taskStatus: "pending", created: $created})
        return t`,
        {
          email: body.data.email,
          name: body.data.name,
          type: body.data.type,
          created: new Date().getTime(),
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('t')['properties'],
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: 'false' };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.error };
    }
  }

  async getTask(body: any) {
    try {
      console.log(body);
      const query = await this.neo4jService.write(
        `match (u:user {email : $email})-[:has_task]->(t:task)
        return t`,
        {
          email: body.email,
        },
      );
      const data = query.records.map((query) => query.get('t').properties);
      return query.records.length > 0
        ? {
            data: data,
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: 'false' };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.error };
    }
  }

  async removeTask(body: any) {
    try {
      const query = await this.neo4jService.write(
        `match (u:user {email : $email})-[:has_task]->(t:task {name: $name})
      detach delete t`,
        {
          email: body.data.email,
          name: body.data.name,
        },
      );
      return { status: true, msg: response.SUCCESS };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.error };
    }
  }

  async editTaskStatus(body: any) {
    try {
      const query = await this.neo4jService.write(
        `match (u:user {email : $email})-[:has_task]->(t:task {name: $name})
      set t.taskStatus= "Done"
      return t`,
        {
          email: body.data.email,
          name: body.data.name,
        },
      );
      return { status: true, msg: response.SUCCESS };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.error };
    }
  }

  async setTaskStatusPending(body: any) {
    try {
      const query = await this.neo4jService.write(
        `match (u:user {email : $email})-[:has_task]->(t:task {name: $name})
      set t.taskStatus= "pending"
      return t`,
        {
          email: body.data.email,
          name: body.data.name,
        },
      );
      return { status: true, msg: response.SUCCESS };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.error };
    }
  }
}
