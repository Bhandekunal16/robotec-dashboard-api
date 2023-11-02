import { Inject, Injectable } from '@nestjs/common';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class YoutubeService {
  constructor(
    @Inject(Neo4jService) private neo4jService: Neo4jService,
    private common: CommonService,
  ) {}

  async createYoutube(body: CreateYoutubeDto) {
    try {
      const query = await this.neo4jService.write(
        `merge (y:youtube {Date: $date, type: $type, name: $name}) return y`,
        {
          date: new Date().toLocaleTimeString(),
          type: body.type,
          name: body.name,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('y')['properties'],
            msg: response.SUCCESS,
            status: true,
          }
        : { data: null, msg: response.error, status: false };
    } catch (error) {
      return error;
    }
  }

  async getAllYoutube(body: CreateYoutubeDto) {
    try {
      const query = await this.common.matchNodeProperty(
        'youtube',
        'type',
        'vedio',
      );
      return query;
    } catch (error) {
      return error;
    }
  }

  async getYoutube(body: CreateYoutubeDto) {
    try {
      const query = await this.common.matchNodeProperty(
        'youtube',
        'type',
        body.name,
      );
      return query;
    } catch (error) {
      return error;
    }
  }

  async getCount1(createProjectDto: CreateYoutubeDto) {
    try {
      const query = await this.common.count2(`youtube`);

      return query.records.length > 0
        ? {
            data: query.records[0].get('count(n)').low,
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: response.error };
    } catch (error) {
      return error;
    }
  }
}
