import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateRobotecUserDto } from './dto/create-robotec-user.dto';
import { response } from 'src/constant/response';

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
          msg: response.SUCCESS,
          status: true,
        };
      } else {
        return { data: null, msg: response.error, status: false };
      }
    } catch (error) {
      return error;
    }
  }

  async allUser(body: CreateRobotecUserDto) {
    try {
      const data = [];
      const query = await this.neo4jService.write(
        `match (m:man{type: "User"}) return m`,
      );
      query.records.forEach((e) => {
        data.push(e.get('m').properties);
      });
      if (query.records.length > 0) {
        return { data: data, status: true, msg: response.SUCCESS };
      } else {
        return { data: null, status: false, msg: response.error };
      }
    } catch (error) {
      return error;
    }
  }

  async shopName(body: CreateRobotecUserDto) {
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
          msg: response.SUCCESS,
          data: query.records[0].get('n')['properties'],
          status: true,
        };
      } else {
        return {
          msg: response.error,
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
          data: query.records[0].get('n')['properties'],
          msg: response.SUCCESS,
          status: true,
        };
      } else {
        return {
          data: null,
          msg: response.error,
          status: false,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async avatar(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `match (m:man {email:"${body.email}"}) return m`,
      );
      if (query.records.length > 0) {
        return {
          data: query.records[0].get('m')['properties'],
          status: true,
          msg: response.SUCCESS,
        };
      } else {
        return {
          data: null,
          status: false,
          msg: response.error,
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
          msg: response.SUCCESS,
          data: query.records[0].get('m')['properties']['type'],
          body: query.records[0].get('m')['properties']['email'],
        };
      else
        return {
          status: false,
          msg: response.error,
          data: null,
        };
    } catch (error) {
      return error;
    }
  }
}
