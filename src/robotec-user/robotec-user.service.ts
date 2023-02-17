import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateRobotecUserDto } from './dto/create-robotec-user.dto';
import { UpdateRobotecUserDto } from './dto/update-robotec-user.dto';

@Injectable()
export class RobotecUserService {
  income: any;
  expanse: any;

  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService) {}

  async create(body: CreateRobotecUserDto): Promise<any> {
    const query = await this.neo4jService.write(
      `create (m:man {income:"${body.income}", expanse:"${body.expanse}"}) return m`,
    );
    return { data: query.records };
  }

  async register(body: CreateRobotecUserDto): Promise<any> {
    const query = await this.neo4jService.write(
      `create (m:man {email:"${body.email}",password:"${body.password}", checkPassword:"${body.password}",phoneNumberPrefix:"${body.phoneNumberPrefix}",phoneNumber:"${body.phoneNumber}"}) return m`,
    );

    return { data: query.records };
  }
}
