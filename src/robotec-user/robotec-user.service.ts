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
        `create (m:man {email: $email,password: $password, checkPassword: $checkPassword, phoneNumberPrefix: $phoneNumberPrefix, phoneNumber: $phoneNumber, type: $type}) return m`,
        {
          email: body.email,
          password: body.password,
          checkPassword: body.checkPassword,
          phoneNumberPrefix: body.phoneNumberPrefix,
          phoneNumber: body.phoneNumber,
          type: body.type,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('m').properties,
            msg: response.SUCCESS + 'man added successfully.',
            status: true,
          }
        : {
            data: null,
            msg: response.FAILURE + 'man not added',
            status: false,
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async allUser() {
    try {
      const data = [];
      const query = await this.neo4jService.write(
        `match (m:man{type: "User"}) return m`,
      );
      query.records.forEach((e) => {
        data.push(e.get('m').properties);
      });
      return query.records.length > 0
        ? { data: data, status: true, msg: response.SUCCESS + 'man found.' }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'man not found.',
          };
    } catch (error) {
      return { res: error, status: false, msg: 'error' };
    }
  }

  async shopName(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `MATCH (n:man {email: $email})
  set n.shopPhoneNumber= $shopPhoneNumber
  set n.shopName= $shopName
  set n.userName= $userName
  set n.shopphoneNumberPrefix= $shopphoneNumberPrefix
   return n`,
        {
          email: body.email,
          shopPhoneNumber: body.shopPhoneNumber,
          shopName: body.shopName,
          userName: body.userName,
          shopphoneNumberPrefix: body.shopphoneNumberPrefix,
        },
      );
      return query.records.length > 0
        ? {
            msg: response.SUCCESS + 'shop edited successfully',
            data: query.records[0].get('n').properties,
            status: true,
          }
        : {
            msg: response.FAILURE + 'shop not edited',
            data: null,
            status: false,
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async editProfile(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `MATCH (n:man {email: $email})
  set n.userName= $userName
  set n.shopName= $shopName
  set n.phoneNumber= $phoneNumber
  set n.shopphoneNumberPrefix= $shopphoneNumberPrefix
   return n`,
        {
          email: body.email,
          userName: body.userName,
          shopName: body.shopName,
          phoneNumber: body.phoneNumber,
          shopphoneNumberPrefix: body.shopphoneNumberPrefix,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('n').properties,
            msg: response.SUCCESS + 'profile edited successfully',
            status: true,
          }
        : {
            data: null,
            msg: response.FAILURE + 'profile not edited',
            status: false,
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async avatar(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `match (m:man {email: $email}) return m`,
        { email: body.email },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('m').properties,
            status: true,
            msg: response.SUCCESS + 'match man',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'email not found',
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async login(body: CreateRobotecUserDto) {
    try {
      const query = await this.neo4jService.write(
        `match (m:man {email: $email, password: $password}) return m`,
        { email: body.email, password: body.password },
      );
      return query.records.length !== 0
        ? {
            status: true,
            msg: response.SUCCESS + 'login successful',
            data: query.records[0].get('m').properties.type,
            body: query.records[0].get('m').properties.email,
          }
        : {
            status: false,
            msg:
              response.FAILURE +
              'please try again later and check your credentials',
            data: null,
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }
}
