import { Inject, Injectable } from '@nestjs/common';
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
import { getTaskCount } from './dto/get-task-count.dto';
import { secret, time } from 'src/token/constants';
import { JwtService } from '@nestjs/jwt';
import { updatesTask } from './dto/updates-task.dto';
import { encrypt } from 'src/data/descriptor/descriptor';
import { ValidationService } from 'src/data/validation/validation.service';
import { logger } from 'src/interface/Logger';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Neo4jService) private neo4jService: Neo4jService,
    private common: CommonService,
    private jwtTokenService: JwtService,
    private validationService: ValidationService,
  ) {}
  async register(body: CreateAuthDto) {
    try {
      const email = this.validationService.isEmail(body.data.email)
        ? body.data.email
        : undefined;

      const mobileNo = this.validationService.isMobile(body.data.phoneNumber)
        ? body.data.phoneNumber
        : undefined;

      if (email && mobileNo !== undefined) {
        const query = await this.neo4jService.write(
          `merge (m:user {email: $email, password: $password, phoneNumber: $phoneNumber, type: $type}) return m`,
          {
            email: email,
            password: body.data.password,
            phoneNumber: mobileNo,
            type: body.data.type,
          },
        );
        return query.records.length > 0
          ? {
              data: query.records[0].get('m').properties,
              msg: response.SUCCESS + 'new user registered successfully',
              status: true,
            }
          : {
              data: null,
              msg: response.FAILURE + 'registration failed!',
              status: false,
            };
      } else
        return {
          data: null,
          msg: response.FAILURE + 'registration failed!',
          status: false,
        };
    } catch (error) {
      logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async addInfo(body: CreateAuthDto) {
    try {
      const match = await this.common.matchNodeProperty(
        'user',
        'userName',
        body.data.userName,
      );

      if (match.status) {
        return {
          data: null,
          msg:
            response.FAILURE + 'userName already taken try with new username',
          status: false,
        };
      } else {
        const query = await this.neo4jService.write(
          `MATCH (n:user {email: $email})
          set n+={
               userName: $userName,
                age: $age,
                name: $name
          }
           return n `,
          {
            email: body.data.email,
            userName: body.data.userName,
            age: body.data.age,
            name: body.data.name,
          },
        );
        return query.records.length > 0
          ? {
              data: query.records[0].get('n').properties,
              msg: response.SUCCESS + 'new user registered successfully',
              status: true,
            }
          : {
              data: null,
              msg: response.FAILURE + 'registration failed!',
              status: false,
            };
      }
    } catch (error) {
      logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async updateRefreshToken(data: any, refreshToken: string) {
    try {
      const query = await this.neo4jService
        .write(`match (u:user {email: "${data}"})
    set u.token= "${refreshToken}"
    return u`);
      return query;
    } catch (error) {
      logger.error('error' + error);
      return error;
    }
  }

  async getTokens(data: any) {
    try {
      const payload = {
        id: data.id,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        type: data.type,
      };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtTokenService.signAsync(payload, {
          expiresIn: time.accessSecretExpireTime,
          secret: secret.accessSecret,
        }),
        this.jwtTokenService.signAsync(payload, {
          secret: secret.refreshSecret,
          expiresIn: time.refreshSecretExpireTime,
        }),
      ]);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error({ reason: error, status: 'error' });
      return { reason: error, status: 'error' };
    }
  }

  async login(body: login) {
    try {
      const query = await this.neo4jService.read(
        `match (u: user {email: $email, password: $password}) return u`,
        { email: body.data.email, password: body.data.password },
      );

      if (query.records.length > 0) {
        let token: string;
        const user = {
          id: query.records[0].get('u').properties.id,
          email: query.records[0].get('u').properties.email,
          password: query.records[0].get('u').properties.password,
          phoneNumber: query.records[0].get('u').properties.phoneNumber,
          type: query.records[0].get('u').properties.type,
          token: '',
        };
        const getToken = await this.getTokens(user);

        await this.updateRefreshToken(user.email, getToken.refreshToken);
        user.token = token;
        return {
          status: true,
          token: getToken,
          msg: 'success',
        };
      }

      return query.records.length > 0
        ? {
            data: query.records[0].get('u').properties,
            status: true,
            msg: response.SUCCESS + 'Login successful',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'please check your credentials',
          };
    } catch (error) {
      logger.error(error);
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

      const taskName = await this.validationService.TrimString(body.data.name);

      if (!match.status) {
        const query = await this.neo4jService.write(
          `match (u: user {email: $email})
          merge (u)-[:has_task]->(t:task {name: $name, type: $type, taskStatus: "pending", created: $created})
          return t`,
          {
            email: body.data.email,
            name: taskName,
            type: body.data.type,
            created: new Date().getTime(),
          },
        );
        return query.records.length > 0
          ? {
              data: query.records[0].get('t').properties,
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
      logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getTask(body: getTask) {
    try {
      const query = await this.neo4jService.write(
        `match (u:user {email : $email})-[:has_task]->(t:task)
        return t`,
        {
          email: body.email,
        },
      );
      const data = query.records.map((query) => query.get('t').properties);
      const name = query.records.map((query) => query.get('t').properties.name);
      const convert = await encrypt.Converter(name);
      for (let i = 0; i < data.length; i++) {
        data[i]['name'] = (await convert).encrypt[i];
      }

      return query.records.length > 0
        ? {
            data: data,
            encrypt: (await convert).encrypt,
            status: true,
            msg: response.SUCCESS + 'task found.',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'task not found.',
          };
    } catch (error) {
      logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async removeTask(body: removeTask) {
    try {
      await this.neo4jService.write(
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
      logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async editTaskStatus(body: editTask) {
    try {
      await this.neo4jService.write(
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
      logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async setTaskStatusPending(body: setTaskStatusPending) {
    try {
      await this.neo4jService.write(
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
      logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getTaskCount(body: getTaskCount) {
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

  async getTaskUpdate(body: updatesTask) {
    try {
      const query = await this.neo4jService.read(
        `MATCH (u:user {email: $email})-[r:has_task]->(n:task)
      WHERE n.created IS NOT NULL AND n.created > 0
      WITH n, datetime({ epochMillis: toInteger(n.created) }) AS creationDate
      WHERE date(creationDate) = date()
      RETURN n ;`,
        { email: body.email },
      );
      const data = query.records.map((query) => query.get('n').properties);

      return query.records.length > 0
        ? { data: data, status: true, msg: response.SUCCESS }
        : { data: null, status: false, msg: response.FAILURE };
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
