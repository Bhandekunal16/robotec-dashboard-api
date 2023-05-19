import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateRobotecUserDto } from './dto/create-robotec-user.dto';
import { UpdateRobotecUserDto } from './dto/update-robotec-user.dto';

const all = [];

@Injectable()
export class RobotecUserService {
  income: any;
  expanse: any;

  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService) {}

  // async create(body: CreateRobotecUserDto): Promise<any> {
  //   const query = await this.neo4jService.write(
  //     `create (m:man {income:"${body.income}", expanse:"${body.expanse}"}) return m`,
  //   );
  //   return { data: query.records };
  // }

  async register(body: CreateRobotecUserDto): Promise<any> {
    const query = await this.neo4jService.write(
      `create (m:man {email:"${body.email}",password:"${body.password}", checkPassword:"${body.password}",phoneNumberPrefix:"${body.phoneNumberPrefix}",phoneNumber:"${body.phoneNumber}", type:"${body.type}"}) return m`,
    );
    return {
      msg: 'user created',
      status: true,
      data: query.records[0].get('m')['properties'],
    };
  }

  async allUser(body: CreateRobotecUserDto): Promise<any> {
    let data = [];
    const query = await this.neo4jService.write(
      `match (m:man{type: "User"}) return m`,
    );
    query.records.forEach((e) => {
      data.push(e.get('m').properties);
    });
    return {
      msg: 'user found',
      status: true,
      data: data,
    };
  }

  async shopname(body: CreateRobotecUserDto): Promise<any> {
    const query = await this.neo4jService.write(
      `MATCH (n:man {email: "${body.email}"})
set n.shopPhoneNumber="${body.shopPhoneNumber}"
set n.shopName="${body.shopName}"
set n.userName="${body.userName}"
set n.shopphoneNumberPrefix="${body.shopphoneNumberPrefix}"
 return n`,
    );
    return {
      msg: 'user created',
      status: true,
    };
  }

  async editProfile(body: CreateRobotecUserDto): Promise<any> {
    const query = await this.neo4jService.write(
      `MATCH (n:man {email: "${body.email}"})
set n.userName="${body.userName}"
set n.shopName="${body.shopName}"
set n.phoneNumber="${body.phoneNumber}"
set n.shopphoneNumberPrefix="${body.shopphoneNumberPrefix}"
 return n`,
    );
    return {
      msg: 'user created',
      status: true,
    };
  }

  async avtor(body: CreateRobotecUserDto): Promise<any> {
    const query = await this.neo4jService.write(
      `match (m:man {email:"${body.email}"}) return m`,
    );
    return {
      msg: 'user found',
      status: true,
      body: query.records[0].get('m')['properties'],
    };
  }

  async login(body: CreateRobotecUserDto): Promise<any> {
    let save = [];
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
      };
  }
}
