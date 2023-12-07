import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class Encrypt {
  convertToBinary = (input) => {
    try {
      Logger.log('this is input' + input, 'descriptor.ts');
      let binary = '';
      for (let i = 0; i < input.length; i++) {
        let charCode = input.charCodeAt(i).toString(2);
        binary += this.padLeft(charCode, 8);
      }
      return binary;
    } catch (error) {
      return error;
    }
  };

  convertToString = (input) => {
    Logger.log('this is input' + input, 'descriptor.ts');
    try {
      let string = '';

      for (let i = 0; i < input.length; i += 8) {
        let binaryCode = input.substr(i, 8);
        let charCode = parseInt(binaryCode, 2);
        string += String.fromCharCode(charCode);
      }

      return string;
    } catch (error) {
      return error;
    }
  };

  padLeft(str, length) {
    return '0'.repeat(length - str.length) + str;
  }

  Converter = async (name) => {
    Logger.log('this is input' + name, 'descriptor.ts');
    let encrypt,
      array = [];
    for (let index = 0; index < name.length; index++) {
      const element = name[index];
      encrypt = await this.convertToBinary(element);
      array.push(encrypt);
    }

    const checker = this.convertString(array);

    return { origin: checker, encrypt: array };
  };

  convertString = async (array) => {
    Logger.log('this is input' + array, 'descriptor.ts');
    let descriptor;
    const output: any = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      descriptor = await this.convertToString(element);
      output.push(descriptor);
    }

    return output;
  };
}

export const encrypt = new Encrypt();
