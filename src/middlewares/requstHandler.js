/* eslint-disable new-cap */
import * as HttpStatus from 'http-status-codes';

/**
 * 必须要让其它同学无感知的使用 router 的参数
 * @author Daoxing.Huang
 * @param {function} handler
 * @returns
 */
export default handler => async (ctx) => {
  const { params, query, body } = ctx.request;
  const paramsAll = { ...params, ...query, body };
  const ret = await handler(paramsAll, ctx);
  ctx.res.status = HttpStatus.OK;
  ctx.body = { status: HttpStatus.OK, data: ret, info: 'Successful' };
};
