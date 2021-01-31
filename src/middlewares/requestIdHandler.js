import { v4 } from 'uuid';
import { httpLog as log } from '../util/log';

export default function requestIdHandler(req, res, next) {
  const requestId = v4();
  log.info('Get an new request ,and auto created request id:', requestId);
  req.headers.requestId = requestId;
  next();
}
