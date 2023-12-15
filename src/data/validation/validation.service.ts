import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  isEmail(email: string) {
    const trimmedEmail = email.trim();
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(trimmedEmail);
  }

  isMobile(mobileNo: any) {
    const trimmedMobileNo = String(mobileNo).trim();
    return /^\d{10}$/.test(trimmedMobileNo);
  }

  isName(name: string) {
    const trimmedName = name.trim();
    return /^[a-zA-Z\s]{1,40}$/.test(trimmedName);
  }

  isPinCode(pinCode: any) {
    const trimmedPinCode = String(pinCode).trim();
    return /^\d{6}$/.test(trimmedPinCode);
  }

  TrimString(body: string): string {
    const data = body.trim();
    return data;
  }

  TrimStringService(body: any): string {
    const data = body.data.replace(/\s+/g, " ").trim();
    return data;
  }
}
