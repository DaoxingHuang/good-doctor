/* eslint-disable new-cap */
import * as HttpStatus from "http-status-codes";
import Exception from '../util/exception';
import {isArray,isObj} from '../util/typeCheck';
import {httpLog as log} from '../util/log';
import { isNumber, isDate } from 'lodash';
import { APIType } from "../decorator";


/**
 * 必须要让其它同学无感知的使用 router 的参数
 * @author Daoxing.Huang
 * @param {function} handler
 * @returns 
 */
export default  (handler)=>async (ctx, next)=>{
    const type =  handler.type;

        
    const {params,query,body}=ctx;
    let paramsAll={...params,...query,body};

    // eslint-disable-next-line no-restricted-syntax
    const ret = await handler(paramsAll, ctx);
    log.info('Response:',JSON.stringify(ret));
    ctx.res.status = HttpStatus.OK;
    ctx.body = ret;
};


