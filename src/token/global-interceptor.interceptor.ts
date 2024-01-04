import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { secret } from './constants';
import { logger } from 'src/interface/Logger';
//   import { auth } from 'src/routes/routes';
@Injectable()
export class GlobalInterceptorInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    try {
      const request = context.switchToHttp().getRequest();
      const urls = [
        '/auth/login',
        '/auth/register',
        '/get/ButtonUI',
        'message',
        '/project/count',
      ];

      if (urls.includes(request.url)) {
        return next.handle();
      }
      const token = request.header('authorization');
      if (!token) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      const accessToken = token.split(' ')[1];
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const jwt = require('jsonwebtoken');
      const key: string = secret.accessSecret;
      jwt.verify(accessToken, key);
      return next.handle();
    } catch (error) {
      logger.error('error' + error.message + 'interceptor');
      if (typeof error.message === 'string') {
        throw new UnauthorizedException(error.message);
      } else {
        return error;
      }
    }
  }
}
