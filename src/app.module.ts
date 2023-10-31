import { Logger, Module } from '@nestjs/common';
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
import { DashboardService } from './dashboard/dashboard.service';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();

Logger.log('neo4j PORT :' + process.env.PORT, 'appModule');
Logger.log('neo4j HOST :' + process.env.HOST, 'appModule');
Logger.log('neo4j User Name :' + environment.username, 'appModule');

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env.HOST,
      port: process.env.PORT,
      username: environment.username,
      password: process.env.PASSWORD,
    }),
    RobotecUserModule,
    ProjectModule,
    InstaModule,
    YoutubeModule,
    MessageModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService, CommonService, ButtonService, DashboardService],
})
export class AppModule {}
