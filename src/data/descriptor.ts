import { Logger } from '@nestjs/common';

function padLeft(str, length) {
  return '0'.repeat(length - str.length) + str;
}

// Function to convert a string to binary representation
export const convertToBinary = (input) => {
  try {
    let binary = '';
    for (let i = 0; i < input.length; i++) {
      let charCode = input.charCodeAt(i).toString(2);
      binary += padLeft(charCode, 8);
    }
    return binary;
  } catch (error) {
    Logger.error(error);
    return error;
  }
};

export const convertArrayToBinary = async (dataArray) => {
  const resultArray = [];

  for (const innerArrayOrObject of dataArray) {
    try {
      let innerData;

      if (Array.isArray(innerArrayOrObject)) {
        innerData = innerArrayOrObject.join('');
      } else if (typeof innerArrayOrObject === 'object') {
        innerData = JSON.stringify(innerArrayOrObject);
      } else {
        throw new Error('Unsupported data type');
      }

      const encrypt = await convertToBinary(innerData);
      resultArray.push(encrypt);
    } catch (error) {
      resultArray.push(error);
    }
  }

  return resultArray;
};
