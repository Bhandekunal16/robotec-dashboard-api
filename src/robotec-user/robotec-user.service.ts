import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateRobotecUserDto } from './dto/create-robotec-user.dto';
import { UpdateRobotecUserDto } from './dto/update-robotec-user.dto';

const all = [];

@Injectable()
export class RobotecUserService {
  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService) {}
  async register(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `create (m:man {email:"${body.email}",password:"${body.password}", checkPassword:"${body.password}",phoneNumberPrefix:"${body.phoneNumberPrefix}",phoneNumber:"${body.phoneNumber}", type:"${body.type}"}) return m`,
      );
      if (query.records.length > 0) {
        return {
          data: query.records[0].get('m')['properties'],
          msg: 'successfully created',
          status: true,
        };
      } else {
        return { data: null, msg: 'error while createing user', status: false };
      }
    } catch (error) {
      return error;
    }
  }

  async allUser(body: CreateRobotecUserDto) {
    try {
      let data = [];
      const query = await this.neo4jService.write(
        `match (m:man{type: "User"}) return m`,
      );
      query.records.forEach((e) => {
        data.push(e.get('m').properties);
      });
      if (query.records.length > 0) {
        return { data: data, status: true, msg: 'All User Found' };
      } else {
        return { data: null, status: false, msg: 'Did not Found anything' };
      }
    } catch (error) {
      return error;
    }
  }

  async shopname(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `MATCH (n:man {email: "${body.email}"})
  set n.shopPhoneNumber="${body.phoneNumber}"
  set n.shopName="${body.shopName}"
  set n.userName="${body.userName}"
  set n.shopphoneNumberPrefix="${body.shopphoneNumberPrefix}"
   return n`,
      );
      if (query.records.length > 0) {
        return {
          msg: 'user created',
          data: query.records[0].get('n')['properties'],
          status: true,
        };
      } else {
        return {
          msg: 'error while creating',
          data: null,
          status: false,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async editProfile(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `MATCH (n:man {email: "${body.email}"})
  set n.userName="${body.userName}"
  set n.shopName="${body.shopName}"
  set n.phoneNumber="${body.phoneNumber}"
  set n.shopphoneNumberPrefix="${body.shopphoneNumberPrefix}"
   return n`,
      );
      if (query.records.length > 0) {
        return {
          data: query,
          msg: 'user created',
          status: true,
        };
      } else {
        return {
          data: null,
          msg: 'error while creating user',
          status: false,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async avtor(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `match (m:man {email:"${body.email}"}) return m`,
      );
      if (query.records.length > 0) {
        return {
          data: query.records[0].get('m')['properties'],
          status: true,
          msg: 'user found',
        };
      } else {
        return {
          data: null,
          status: false,
          msg: 'user not found',
        };
      }
    } catch (error) {
      return error;
    }
  }

  async login(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `match (m:man {email:"${body.email}",password:"${body.password}"}) return m`,
      );
      if (query.records.length !== 0)
        return {
          status: true,
          msg: 'user found',
          data: query.records[0].get('m')['properties']['type'],
          body: query.records[0].get('m')['properties']['email'],
        };
      else
        return {
          status: false,
          msg: 'user not found',
          data: null,
        };
    } catch (error) {
      return error;
    }
  }
}
