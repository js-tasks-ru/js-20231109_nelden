/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */


function getTrimmedStr(string, size) {
  let result = '';
  let lastChar = '';
  let count = 0;
 
  for (let char of string) {
 
    if (char === lastChar) {
      count++;
    } else {
      count = 1;
    }
 
    if (count <= size) {
      result += char;
    }
 
    lastChar = char;
  }
 
  return result;
}
 

export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  } else if (size == 0) {
    return '';
  } else {
    return getTrimmedStr(string, size);
  }
}
