import { color } from './color';

class Logger {
  log(body) {
    console.log(color.green + `[Node] ${body}`);
  }

  error(body) {
    console.log(color.red + `[Node] ${body}`);
  }
}

export const logger = new Logger();
