import { Inject, Injectable } from '@nestjs/common';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';
import { CommonService } from 'src/common/common.service';
import { getYoutubeVideo } from './dto/get-youtube.dto';

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
          date: new Date().getTime(),
          type: body.type,
          name: body.name,
        },
      );
      return query.records.length > 0
        ? {
            data: query.records[0].get('y')['properties'],
            msg: response.SUCCESS + 'successfully created',
            status: true,
          }
        : {
            data: null,
            msg:
              response.FAILURE + 'something gone wrong when creating youtube.',
            status: false,
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getAllYoutube() {
    try {
      const query = await this.common.matchNodeProperty(
        'youtube',
        'type',
        'vedio',
      );
      return query;
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getYoutube(body: getYoutubeVideo) {
    try {
      const query = await this.common.matchNodeProperty(
        'youtube',
        'type',
        body.name,
      );
      return query;
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async getCount1() {
    try {
      const query = await this.common.count2(`youtube`);

      return query.status
        ? {
            data: query.data,
            status: true,
            msg: response.SUCCESS + 'youtube found.',
          }
        : { data: null, status: false, msg: response.FAILURE };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }
}
