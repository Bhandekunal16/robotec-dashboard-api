export class CreateAuthDto {
  readonly data: {
    readonly email: string;
    readonly password: string;
    readonly phoneNumber: string;
    readonly type: string;
  };
}
