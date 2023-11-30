import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { secret } from './constants';
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
      Logger.verbose(' urls : ' + urls, 'interceptor');

      if (urls.includes(request.url)) {
        Logger.verbose('true : ' + request.url, 'interceptor');
        return next.handle();
      }
      const token = request.header('authorization');
      if (!token) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      const accessToken = token.split(' ')[1];
      Logger.verbose('accessToken :' + accessToken, 'interceptor');
      const jwt = require('jsonwebtoken');
      const key: string = secret.accessSecret;
      const payload: any = jwt.verify(accessToken, key);
      Logger.verbose('payload :' + payload, 'interceptor');
      return next.handle();
    } catch (error) {
      Logger.error('error' + error.message, 'interceptor');
      // ! if there's an error, handle it and send an appropriate response
      if (typeof error.message === 'string') {
        throw new UnauthorizedException(error.message);
      } else {
        return error;
      }
    }
  }
}
