import { STATUS_CODES } from 'http';

class Response {
  readonly SUCCESS: string = 'SUCCESS' + ' -' + [STATUS_CODES[200]] + ' :';
  readonly ERROR: string = 'error' + ' -' + [STATUS_CODES[403]] + ' :';
  readonly FAILURE: string = 'FAILURE' + ' -' + [STATUS_CODES[404]];
}

export const response = new Response();
