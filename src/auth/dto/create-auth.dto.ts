export class CreateAuthDto {
  readonly data: {
    readonly userName?: string;
    readonly email: string;
    readonly password: string;
    readonly phoneNumber: string;
    readonly type: string;
    readonly age?: number;
    readonly name?: string;
  };
}
