import * as HttpStatus from 'http-status-codes';
import { httpLog as log } from '../util/log';
import { isDevelopment } from '../util/env';

/**
 * 中间件，用来对错误做统一返回处理,目前仅是事例，可以扩展随意拓展，只要你觉得开心即可。
 * @author Daoxing.Huang
 * @param {Array | String } err - 具体的错误信息
 * @param {Request} req Request express Request 对象
 * @param {Response} res Response express Response 对象
 * @param {Function} next next函数
 */
export default function handleError({ err, req, res }, next) {
  log.error(req.headers.requestId, `Error: ${JSON.stringify(err)}`);
  const errCode = err.status || err.code || 500;
  res.status(HttpStatus.EXPECTATION_FAILED).json({
    status: 0,
    info: { code: err.code, message: err.message },
  });
}
