import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    Logger.verbose('body :' + req.body, 'GlobalMiddleware');
    next();
  }
}
