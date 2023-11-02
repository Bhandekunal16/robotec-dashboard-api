import { Inject, Injectable } from '@nestjs/common';
import { CreateInstaDto } from './dto/create-insta.dto';
import { UpdateInstaDto } from './dto/update-insta.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';
import { CommonService } from 'src/common/common.service';
import { GetInsta } from './dto/get-insta.dto';

@Injectable()
export class InstaService {
  constructor(
    @Inject(Neo4jService) private neo4jService: Neo4jService,
    private common: CommonService,
  ) {}

  async createInsta(data: CreateInstaDto) {
    try {
      const query = await this.neo4jService.write(
        `merge (i:instagram {Date: $date,type: $type, userName: $userName}) return i`,
        { date: new Date(), type: data.type, userName: data.userName },
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

  async getAllInst() {
    try {
      const query = await this.common.matchNode('instagram');
      return query;
    } catch (error) {
      return error;
    }
  }

  async getInsta(data: GetInsta) {
    try {
      const query = await this.common.matchNodeProperty(
        'instagram',
        'userName',
        data.userName,
      );
      return query;
    } catch (error) {
      return error;
    }
  }

  async getFollowing() {
    try {
      const query = await this.common.count('instagram', 'type', 'following');
      return query;
    } catch (error) {
      return error;
    }
  }

  async getFollower() {
    try {
      const query = await this.common.count('instagram', 'type', 'follower');
      return query;
    } catch (error) {
      return error;
    }
  }
}
