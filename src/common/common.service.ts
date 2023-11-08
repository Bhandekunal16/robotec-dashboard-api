import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { response } from 'src/constant/response';

@Injectable()
export class CommonService {
  constructor(private neo: Neo4jService) {}
  async matchNode(node: any) {
    try {
      Logger.log('in the match node');
      const query = await this.neo.read(`match (n:${node}) return n`);
      const data = query.records.map((query) => query.get('n').properties);
      return query.records.length > 0
        ? { data: data, status: true, msg: response.SUCCESS + 'node found' }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'node not found',
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async matchNodeProperty(node: any, property: any, value: any) {
    try {
      Logger.log('in the match node');
      const query = await this.neo.read(
        `match (n:${node} {${property} : $value}) return n`,
        { value },
      );
      const data = query.records.map((query) => query.get('n').properties);
      return query.records.length > 0
        ? { data: data, status: true, msg: response.SUCCESS + 'node found' }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'node not found',
          };
    } catch (error) {
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async count(node: any, property: any, value: any) {
    try {
      const Query = await this.neo.read(
        `match (n:${node} {${property} : $value}) return count(n)`,
        { value },
      );
      Logger.verbose(Query.records.length);
      return Query.records.length > 0
        ? {
            data: Query.records[0].get('count(n)').low,
            status: true,
            msg: response.SUCCESS + `count for ${node}`,
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + `count for ${node}`,
          };
    } catch (error) {
      Logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async count2(node: any) {
    try {
      const Query = await this.neo.read(`match (n:${node}) return count(n)`);
      Logger.verbose(Query.records.length);
      return Query.records.length > 0
        ? {
            data: Query.records[0].get('count(n)').low,
            status: true,
            msg: response.SUCCESS + `count for ${node}`,
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + `count for ${node}`,
          };
    } catch (error) {
      Logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }

  async matchProperty(
    node1: any,
    property1: any,
    value1: any,
    relation: any,
    node2: any,
    property2: any,
    value2: any,
  ) {
    try {
      const Query = await this.neo.read(
        `
        MATCH (n: ${node1} { ${property1}: $value1 })-[r:${relation}]->(m:${node2} { ${property2}: $value2 })
        RETURN m,n
        `,
        { value1, value2 },
      );

      const data = Query.records.map((record) => record.get('m').properties);
      const data2 = Query.records.map((record) => record.get('n').properties);
      Logger.verbose(Query.records.length);
      return Query.records.length > 0
        ? {
            data: data,
            data2: data2,
            status: true,
            msg: response.SUCCESS + 'node found',
          }
        : {
            data: null,
            status: false,
            msg: response.FAILURE + 'node not found',
          };
    } catch (error) {
      Logger.error(error);
      return { res: error, status: false, msg: response.ERROR };
    }
  }
}
