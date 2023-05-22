import { Inject, Injectable } from '@nestjs/common';
import { CreateInstaDto } from './dto/create-insta.dto';
import { UpdateInstaDto } from './dto/update-insta.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';
import {
  GetFollowerCount,
  GetFollowingCount,
  GetInstagram,
} from '../query/query';

@Injectable()
export class InstaService {
  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService) {}

  async createInsta(data: CreateInstaDto) {
    try {
      const query = await this.neo4jService.write(
        `merge (i:instagram {Date:"${new Date()}",type:"${
          data.type
        }",userName:"${data.userName}"}) return i`,
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('i')['properties'],
            msg: response.SUCCESS,
            status: true,
          }
        : { data: null, msg: response.error, status: false };
    } catch (error) {
      return error;
    }
  }

  async getAllinst(data: CreateInstaDto) {
    try {
      const query = await this.neo4jService.read(GetInstagram());
      let application = query.records.map((query) => query.get('i').properties);
      return application.length > 0
        ? {
            data: application,
            msg: response.SUCCESS,
            status: true,
          }
        : { data: null, msg: response.error, status: false };
    } catch (error) {
      return error;
    }
  }

  async getInsta(data: CreateInstaDto) {
    try {
      const query = await this.neo4jService.read(
        `match (i:instagram {userName:"${data.userName}"}) return i`,
      );
      let application = query.records.map((query) => query.get('i').properties);
      return application.length > 0
        ? {
            data: application,
            msg: response.SUCCESS,
            status: true,
          }
        : { data: null, msg: response.error, status: false };
    } catch (error) {
      return error;
    }
  }

  async getFollowing(createInstaDto: CreateInstaDto) {
    try {
      const query = await this.neo4jService.read(GetFollowingCount());
      return query.records.length > 0
        ? {
            data: query.records[0].get('count (n)').low,
            msg: response.SUCCESS,
            status: true,
          }
        : { data: null, msg: response.error, status: false };
    } catch (error) {
      return error;
    }
  }

  async getFollower(createInstaDto: CreateInstaDto) {
    try {
      const query = await this.neo4jService.read(GetFollowerCount());
      return query.records.length > 0
        ? {
            data: query.records[0].get('count (n)').low,
            msg: response.SUCCESS,
            status: true,
          }
        : { data: null, msg: response.error, status: false };
    } catch (error) {
      return error;
    }
  }
}
