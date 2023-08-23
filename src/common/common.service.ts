import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class CommonService {
  constructor(private neo: Neo4jService) {}
  async matchNode(node: any) {
    try {
      Logger.log('in the match node');
      const query = await this.neo.read(`match (n:${node}) return n`);
      const data = query.records.map((query) => query.get('n').properties);
      return query.records.length > 0
        ? { data: data, status: true, msg: 'success' }
        : { data: null, status: false, msg: 'failed' };
    } catch (error) {
      return error;
    }
  }

  async matchNodeProperty(node: any, property: any, value: any) {
    try {
      Logger.log('in the match node');
      const query = await this.neo.read(
        `match (n:${node} {${property} : "${value}"}) return n`,
      );
      const data = query.records.map((query) => query.get('n').properties);
      return query.records.length > 0
        ? { data: data, status: true, msg: 'success' }
        : { data: null, status: false, msg: 'failed' };
    } catch (error) {
      return error;
    }
  }

  async count(node: any,property: any, value: any) {
    try {
      const Query = await this.neo.read(`match (n:${node} {${property} : "${value}"}) return count(n)`);
      Logger.verbose(Query.records.length);
      return Query.records.length > 0
        ? {
            data: Query.records[0].get('count(n)').low,
            status: true,
            msg: 'success',
          }
        : {
            data: null,
            status: false,
            msg: 'Failed',
          };
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
}
