import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, CommonService],
})
export class ProjectModule {}
