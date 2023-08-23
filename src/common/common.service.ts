import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class CommonService {
    constructor(private neo: Neo4jService){}
    async matchNode(node: any){
        try {
            Logger.log('in the match node')
            const query = await this.neo.read(`match (n:${node}) return n`)
            let data = query.records.map((query) => query.get('n').properties);
            return query.records.length > 0
             ? { data: data, status: true, msg: "success" }
             : { data: null, status: false, msg:"failed"}
        } catch (error) {
            return error
        }
    }
}
