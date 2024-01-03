class Secret {
  readonly accessSecret: string = 'accessSecret';
  readonly refreshSecret: string = 'refreshSecret';
}

class JwtConstants {
  readonly secret: string = '123456789';
}

class Time {
  readonly accessSecretExpireTime: string = '2d';
  readonly refreshSecretExpireTime: string = '7d';
}

export const secret = new Secret();
export const jwtConstants = new JwtConstants();
export const time = new Time();
