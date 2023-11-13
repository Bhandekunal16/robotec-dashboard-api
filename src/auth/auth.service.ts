import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { response } from 'src/constant/response';
import { Neo4jService } from 'nest-neo4j/dist';
import { CommonService } from 'src/common/common.service';
import { login } from './dto/login-dto';
import { addTask } from './dto/Add-task.dto';
import { getTask } from './dto/get-task.dto';
import { removeTask } from './dto/remove-task.dto';
import { editTask } from './dto/edit-task.dto';
import { setTaskStatusPending } from './dto/set-task-status-pending.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Neo4jService) private neo4jService: Neo4jService,
    private common: CommonService,
  ) {}
  async register(body: CreateAuthDto) {
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
            msg: response.SUCCESS + 'new user registered successfully',
            status: true,
          }
        : {
            data: null,
            msg: response.FAILURE + 'registration failed!',
            status: false,
          };
    } catch (error) {
      Logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async login(body: login) {
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
            msg: response.SUCCESS + 'Login successful',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'please check your credentials',
          };
    } catch (error) {
      console.log(error);

      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async AddTask(body: addTask) {
    try {
      const match = await this.common.matchProperty(
        'user',
        'email',
        body.data.email,
        'has_task',
        'task',
        'name',
        body.data.name,
      );

      if (!match.status) {
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
              msg: response.SUCCESS + 'task added successfully',
            }
          : {
              data: null,
              status: false,
              msg:
                response.FAILURE +
                'email address not matching. please check your credentials',
            };
      } else {
        return { data: null, status: false, msg: 'same task present' };
      }
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getTask(body: getTask) {
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
            msg: response.SUCCESS + 'task found.',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'task not found.',
          };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async removeTask(body: removeTask) {
    try {
      const query = await this.neo4jService.write(
        `match (u:user {email : $email})-[:has_task]->(t:task {name: $name})
      detach delete t`,
        {
          email: body.data.email,
          name: body.data.name,
        },
      );
      return {
        status: true,
        msg: response.SUCCESS + 'task removed successfully',
      };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async editTaskStatus(body: editTask) {
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
      return {
        status: true,
        msg: response.SUCCESS + 'task edited successfully.',
      };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async setTaskStatusPending(body: setTaskStatusPending) {
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
      return { status: true, msg: response.SUCCESS + 'task status changed' };
    } catch (error) {
      console.log(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getTaskCount(body: any) {
    try {
      const success = await this.neo4jService.read(
        `match (u:user {email: $email})-[:has_task]->(t:task {taskStatus: "Done"}) return count(u)`,
        { email: body.data },
      );
      const pending = await this.neo4jService.read(
        `match (u:user {email: $email})-[:has_task]->(t:task {taskStatus: "pending"}) return count(u)`,
        { email: body.data },
      );

      return {
        success: success.records[0].get('count(u)').low,
        pending: pending.records[0].get('count(u)').low,
        status: true,
        msg: response.SUCCESS,
      };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async matchUser(email: any) {
    try {
      const query = await this.common.matchNodeProperty('user', 'email', email);
      return query;
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }
}
