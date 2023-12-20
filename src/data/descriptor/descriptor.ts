import { Injectable, Logger } from '@nestjs/common';
import { response } from 'src/constant/response';

@Injectable()
export class Encrypt {
  convertToBinary = (input) => {
    try {
      Logger.log('this is input' + input, 'descriptor.ts');
      let binary = '';
      for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i).toString(2);
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
        const binaryCode = input.substr(i, 8);
        const charCode = parseInt(binaryCode, 2);
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
    let encrypt;
    const array = [];
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

  convertToStringFromBinary = (input) => {
    try {
      if (!input || typeof input.data !== 'string') {
        throw new Error(
          'Input must be a JSON object with a "data" key containing a binary string.',
        );
      }

      const binaryData = input.data;

      Logger.log(`Converting binary to string: ${binaryData}`, 'descriptor.ts');

      let result = '';
      for (let i = 0; i < binaryData.length; i += 8) {
        const byte = binaryData.substr(i, 8);
        result += String.fromCharCode(parseInt(byte, 2));
      }

      Logger.log(`String representation: ${result}`, 'descriptor.ts');
      return { data: result, status: true, msg: 'SUCCESS' };
    } catch (error) {
      Logger.error(
        `Error converting binary to string: ${error.message}`,
        'descriptor.ts',
      );
      return { data: '', status: false, msg: error.message };
    }
  };

  convertToBinary2 = (input) => {
    try {
      if (typeof input.data !== 'string') {
        throw new Error('Input must be a string.');
      }

      Logger.log(`Converting string to binary: ${input.data}`, 'descriptor.ts');

      let binary = '';
      for (let i = 0; i < input.data.length; i++) {
        const charCode = input.data.charCodeAt(i).toString(2);
        binary += this.PadLeft(charCode, 8);
      }

      Logger.log(`Binary representation: ${binary}`, 'descriptor.ts');
      return {
        data: binary,
        status: true,
        msg: response.SUCCESS + 'string is encripted',
      };
    } catch (error) {
      Logger.error(
        `Error converting string to binary: ${error.message}`,
        'descriptor.ts',
      );
      return { data: '', status: false, msg: error.message };
    }
  };

  PadLeft = (value, length) => {
    return value.toString().padStart(length, '0');
  };
}

export const encrypt = new Encrypt();
