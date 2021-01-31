// 是否字符串
export const isString = o => Object.prototype.toString.call(o).slice(8, -1) === 'String';
// 是否数字
export const isNumber = o => Object.prototype.toString.call(o).slice(8, -1) === 'Number';

export const isObj = (
  o, // 是否对象
) => Object.prototype.toString.call(o).slice(8, -1) === 'Object';

export const isArray = (
  o, // 是否数组
) => Object.prototype.toString.call(o).slice(8, -1) === 'Array';

export const isDate = (
  o, // 是否时间
) => Object.prototype.toString.call(o).slice(8, -1) === 'Date';

export const isBoolean = (
  o, // 是否boolean
) => Object.prototype.toString.call(o).slice(8, -1) === 'Boolean';

export const isFunction = (
  o, // 是否函数
) => Object.prototype.toString.call(o).slice(8, -1) === 'Function';

export const isNull = (
  o, // 是否为null
) => Object.prototype.toString.call(o).slice(8, -1) === 'Null';

export const isUndefined = (
  o, // 是否undefined
) => Object.prototype.toString.call(o).slice(8, -1) === 'Undefined';

export const isFalse = o => {
  if (
    o === '' ||
    o === undefined ||
    o === null ||
    o === 'null' ||
    // eslint-disable-next-line no-restricted-globals
    o === 'undefined' ||
    o === 0 ||
    o === false ||
    isNaN(o)
  )
    return true;
  return false;
};

const isTrue = o => !this.isFalse(o);
