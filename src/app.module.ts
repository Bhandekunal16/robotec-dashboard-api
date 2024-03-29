import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotecUserModule } from './robotec-user/robotec-user.module';
import { ProjectModule } from './project/project.module';
import { InstaModule } from './insta/insta.module';
import { YoutubeModule } from './youtube/youtube.module';
import { environment } from './env/environment';
import { CommonService } from './common/common.service';
import { ButtonService } from './button/button.service';
import { DashboardService } from './dashboard/dashboard.service';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { GlobalInterceptorInterceptor } from './token/global-interceptor.interceptor';
import { ChatGateway } from './chat/chat.gateway';
import { DescriptorModule } from './data/descriptor/descriptor.module';
import { ValidationService } from './data/validation/validation.service';
import { logger } from './interface/Logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

logger.log('neo4j PORT :' + process.env.PORT);
logger.log('neo4j HOST :' + process.env.HOST);
logger.log('neo4j User Name :' + environment.username);

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
    DescriptorModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    CommonService,
    ButtonService,
    DashboardService,
    ChatGateway,
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptorInterceptor,
    },
    JwtService,
    ValidationService,
  ],
})
export class AppModule {}
