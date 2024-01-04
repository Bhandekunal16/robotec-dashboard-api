class Color {
  readonly black: string = '\x1b[30m';
  readonly red: string = '\x1b[31m';
  readonly green: string = '\x1b[32m';
  readonly yellow: string = '\x1b[33m';
  readonly blue: string = '\x1b[34m';
  readonly magenta: string = '\x1b[35m';
  readonly cyan: string = '\x1b[36m';
  readonly white: string = '\x1b[37m';
}

export const color = new Color();
