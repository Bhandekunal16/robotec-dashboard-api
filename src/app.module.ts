import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotecUserModule } from './robotec-user/robotec-user.module';
import { ProjectModule } from './project/project.module';
import { InstaModule } from './insta/insta.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: 'b76e3d84.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: 'kH8WQkwu-vK5bmjUYjJ2oe1kbcBeoZdDeErj9o8woSk',
    }),
    RobotecUserModule,
    ProjectModule,
    InstaModule,
    YoutubeModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
