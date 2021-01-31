// eslint-disable-next-line import/prefer-default-export
import { isObj } from './typeCheck';

export const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

export const formatDate = (time, format = 'YY-MM-DD hh:mm:ss') => {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const // 月份是从0开始的
    day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  // eslint-disable-next-line prefer-spread
  const preArr = Array.apply(null, Array(10)).map((elem, index) => `0${index}`);
  const newTime = format
    .replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec);

  return newTime;
};

export const deepClone = obj => {
  if (!isObj(obj)) {
    throw new Error('it should be Object,but ', typeof obj);
  }
  return JSON.parse(JSON.stringify(obj));
};
