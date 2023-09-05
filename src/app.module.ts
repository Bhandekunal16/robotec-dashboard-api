import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotecUserModule } from './robotec-user/robotec-user.module';
import { ProjectModule } from './project/project.module';
import { InstaModule } from './insta/insta.module';
import { YoutubeModule } from './youtube/youtube.module';
import { environment } from './env/enverment';
import { CommonService } from './common/common.service';
import { ButtonService } from './button/button.service';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: environment.host,
      port: environment.port,
      username: environment.username,
      password: environment.password,
    }),
    RobotecUserModule,
    ProjectModule,
    InstaModule,
    YoutubeModule,
  ],

  controllers: [AppController],
  providers: [AppService, CommonService, ButtonService],
})
export class AppModule {}
