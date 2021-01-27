/** 
 * @author Daxing.Huang
 * @description 环境相关的变量或函数
 * @memberof env
 * @function
 * @public
*/
const isDevelopment=()=> process.env.NODE_ENV==='development';

// eslint-disable-next-line import/prefer-default-export
export  { isDevelopment };
