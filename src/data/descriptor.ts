import { Logger } from '@nestjs/common';

export const convertToBinary = (input) => {
  try {
    Logger.log(input, 'this is input');
    let binary = '';
    for (let i = 0; i < input.length; i++) {
      let charCode = input.charCodeAt(i).toString(2);
      binary += padLeft(charCode, 8);
    }
    return binary;
  } catch (error) {
    return error;
  }
};

export const convertToString = (input) => {
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

function padLeft(str, length) {
  return '0'.repeat(length - str.length) + str;
}

export const Converter = async (name) => {
  let encrypt,
    array = [];
  for (let index = 0; index < name.length; index++) {
    const element = name[index];
    encrypt = await convertToBinary(element);
    array.push(encrypt);
  }

  const checker = convertString(array);

  return { origin: checker, encrypt: array };
};

const convertString = async (array) => {
  let descriptor;
  const output: any = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    descriptor = await convertToString(element);
    output.push(descriptor);
  }

  return output;
};
