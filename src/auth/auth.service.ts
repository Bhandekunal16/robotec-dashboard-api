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
}