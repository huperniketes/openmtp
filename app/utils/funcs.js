'use strict';

export const isArraysEqual = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

export const isInt = n => {
  if (typeof n !== 'number') {
    return false;
  }
  return Number(n) === n && n % 1 === 0;
};

export const isFloat = n => {
  if (typeof n !== 'number') {
    return false;
  }
  return Number(n) === n && n % 1 !== 0;
};

export const isNumber = n => {
  return typeof n === 'number';
};

export const isArray = n => {
  return Array.isArray(n);
};

export const niceBytes = (a, b) => {
  if (0 === a) {
    return '0 Bytes';
  }
  const c = 1024,
    d = b || 2,
    e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
};

export const replaceBulk = (str, findArray, replaceArray) => {
  let i,
    regex = [],
    map = {};
  for (i = 0; i < findArray.length; i++) {
    regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1'));
    map[findArray[i]] = replaceArray[i];
  }
  regex = regex.join('|');
  str = str.replace(new RegExp(regex, 'g'), matched => {
    return map[matched];
  });
  return str;
};

export const splitIntoLines = str => {
  return str.split(/(\r?\n)/g);
};

export const quickHash = str => {
  let hash = 0;
  let i;
  let chr;

  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const percentage = (current, total) => {
  return parseInt((current / total) * 100);
};

export const truncate = (str, length) => {
  const dots = str.length > length ? '...' : '';
  return str.substring(0, length) + dots;
};

export const stripRootSlash = str => {
  return str.replace(/^\//g, '');
};

export const springTruncate = (str, minChars = 10, ellipsis = '...') => {
  const _str = str;
  const strLength = str.length;
  if (strLength > minChars) {
    const ellipsisLength = ellipsis.length;

    if (ellipsisLength > minChars) {
      return {
        text: _str,
        truncatedText: str.substr(strLength - minChars),
        isTruncated: true
      };
    }

    const count = -0.5 * (minChars - strLength - ellipsisLength);
    const center = strLength / 2;

    return {
      text: _str,
      truncatedText: `${str.substr(0, center - count)}${ellipsis}${str.substr(
        strLength - center + count
      )}`,
      isTruncated: true
    };
  }

  return {
    text: _str,
    truncatedText: str,
    isTruncated: false
  };
};

export const undefinedOrNull = _var => {
  return typeof _var === 'undefined' || _var === null;
};

export const diffObj = (obj1, obj2) => {
  let isSame = true;
  for (let p in obj1) {
    if (typeof obj1[p] === 'object') {
      const objectValue1 = obj1[p];
      const objectValue2 = obj2[p];
      for (let value in objectValue1) {
        isSame = diffObj(objectValue1[value], objectValue2[value]);
        if (isSame === false) {
          return false;
        }
      }
    } else {
      if (obj1 !== obj2) {
        isSame = false;
      }
    }
  }
  return isSame;
};
