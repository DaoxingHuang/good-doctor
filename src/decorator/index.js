import * as HttpStatus from "http-status-codes";
import {isArray,isObj,isString, isFunction} from '../util/typeCheck';
import { requstHandler,paramsHandler} from '../middlewares';

/**
 * 用于动态路由、参数验证、无感知应用
 * @author:Daoxing.Huang
 * @see  {@link 关于装饰器的使用，请参考}
 * @memberof Decorator
 */

/**
 * Methods
 */
export const RequestMethod = {
    "GET":"get",
    "POST": "post",
    "PUT": "put",
    "DELETE": "delete",
    "OPTION": "option",
    "PATCH": "patch"
};

/**
 * APIType
 */
export const APIType = {
    API: "API",
    SSR: "SSR"
};


/**
 * 定义注册的路由数组
 */
export const controllers = [];

/**
 * 类装饰器，用于扩展原来对象的属性，添加URL前缀
 * Author:Daoxing.Huang
 * @function
 * @param {String} path - 子路径
 */
export function RouteMap(path){
    return (target)=>{
        // 扩展原来对象的属性
        // eslint-disable-next-line no-param-reassign
        target.prefix = path;
    };
}

/**
 *
 * 通过装饰器队构造并创建router 需要的数据 url，method，middleware
 * @export
 * @param {Object} [options={}] 配置项
 * @param {String} [options.url='/']  子路由配置
 * @param {String} [options.method='get'] 需要执行的action
 * @param {String} [options.middleware=[]] options.middleware 中间件
 * @param {String} [options.pValidator] options.validator 参数验证
 * @returns 构建可以创建router的对象
 */
export function RequestMap(options){
    return (target,name,descriptor)=>{
        const className = target.constructor.name||target.prototype.name;
        const checkOptions = options||{};
        const checks = paramsHandler(className,name);
        const fn =  descriptor.value || descriptor.initializer();
        if(!isFunction(fn)){
            throw new SyntaxError(`@RequestMap can only be used on functions, not: ${descriptor.value}`);
        }
        const hander = fn.bind(target);
        hander.type =  options.type || APIType.API;
        const item = {
            url:checkOptions.url||'/',
            method:checkOptions.method||RequestMethod.GET,
            middleware:[...checks,...checkOptions.middleware||[]],
            handler:requstHandler(hander),
            constructor:target.constructor||target.prototype,
        };
        controllers.push(item);
    };
}