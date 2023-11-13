import { IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateRobotecUserDto {
  readonly income?: string;
  readonly expanse?: string;
  readonly password: string;
  readonly phoneNumberPrefix: string;

  @IsPhoneNumber()
  readonly phoneNumber: string;

  readonly checkPassword: string;

  @IsEmail()
  readonly email: string;

  readonly type: string;
  readonly shopPhoneNumber: string;
  readonly shopName: string;
  readonly userName: string;
  readonly shopphoneNumberPrefix: string;
}
