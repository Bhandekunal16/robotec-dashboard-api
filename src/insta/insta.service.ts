import { Inject, Injectable } from '@nestjs/common';
import { CreateInstaDto } from './dto/create-insta.dto';
import { UpdateInstaDto } from './dto/update-insta.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class InstaService {
  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService, private common: CommonService) {}

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

  async getAllInst(data: CreateInstaDto) {
    try {
      const query = await this.common.matchNode('instagram')
      return query
    } catch (error) {
      return error;
    }
  }

  async getInsta(data: CreateInstaDto) {
    try {
     const query = await this.common.matchNodeProperty('instagram','userName',data.userName)
     return query
    } catch (error) {
      return error;
    }
  }

  async getFollowing(createInstaDto: CreateInstaDto) {
    try {
      const query = await this.common.count('instagram','type','following')
      return query
    } catch (error) {
      return error;
    }
  }

  async getFollower(createInstaDto: CreateInstaDto) {
    try {
      const query = await this.common.count('instagram','type','follower')
      return query
    } catch (error) {
      return error;
    }
  }
}
