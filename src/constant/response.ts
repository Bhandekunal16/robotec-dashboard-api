import { STATUS_CODES } from 'http';

export class response {
  public static SUCCESS = 'SUCCESS' + ' -' + [STATUS_CODES[200]] + ' :';
  public static ERROR = 'error' + ' -' + [STATUS_CODES[403]] + ' :';
  public static FAILURE = 'FAILURE' + ' -' + [STATUS_CODES[404]];
}
