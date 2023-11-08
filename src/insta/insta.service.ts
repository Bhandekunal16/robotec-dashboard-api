import { Inject, Injectable } from '@nestjs/common';
import { CreateInstaDto } from './dto/create-insta.dto';
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
        {
          date: new Date().getTime(),
          type: data.type,
          userName: data.userName,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('i')['properties'],
            msg: response.SUCCESS + 'insta account created successfully',
            status: true,
          }
        : {
            data: null,
            msg: response.FAILURE + 'not created anything',
            status: false,
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getAllInst() {
    try {
      const query = await this.common.matchNode('instagram');
      return query;
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
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
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getFollowing() {
    try {
      const query = await this.common.count('instagram', 'type', 'following');
      return query;
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getFollower() {
    try {
      const query = await this.common.count('instagram', 'type', 'follower');
      return query;
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }
}
