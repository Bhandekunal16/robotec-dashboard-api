import { Inject, Injectable } from '@nestjs/common';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { UpdateYoutubeDto } from './dto/update-youtube.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';

@Injectable()
export class YoutubeService {
  constructor(@Inject(Neo4jService) private neo4jService: Neo4jService) {}

  async createYoutube(body: CreateYoutubeDto) {
    try {
      const query = await this.neo4jService.write(
        `merge (y:youtube {Date:"${new Date()}",type:"${body.type}",name:"${
          body.name
        }"}) return y`,
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
      const query = await this.neo4jService.read(`match (p:youtube) return p`);
      let application = query.records.map((query) => query.get('p').properties);
      return application.length > 0
        ? { data: application, status: true, msg: response.SUCCESS }
        : { data: null, status: false, msg: response.error };
    } catch (error) {
      return error;
    }
  }

  async getYoutube(body: CreateYoutubeDto) {
    try {
      const query = await this.neo4jService.read(
        `match (p:youtube {name:"${body.name}"}) return p`,
      );

      return query.records.length > 0
        ? {
            data: query.records[0].get('p')['properties'],
            status: true,
            msg: response.SUCCESS,
          }
        : { data: null, status: false, msg: response.error };
    } catch (error) {
      return error;
    }
  }

  async getCount1(createProjectDto: CreateYoutubeDto) {
    try {
      const query = await this.neo4jService.read(
        ` MATCH (n:youtube {type: "vedio"}) RETURN count(n)`,
      );

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