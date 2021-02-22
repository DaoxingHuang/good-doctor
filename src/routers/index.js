import Router from 'koa-router';
import { controllers } from '../decorator';
import { getPrefix } from '../apis';
// eslint-disable-next-line no-unused-vars
import ctxs from '../controllers';

const router = new Router({
  prefix: getPrefix('v1'),
});

/**
 * @author Daoxing.Huang
 * @description 初始化路由
 *
 */
export default () => {
  const printTable = [];
  controllers.forEach(item => {
    // 获取每个路由的前缀
    const { prefix } = item.constructor;
    let { url } = item;
    const { method } = item;
    if (prefix) url = `${prefix}${url}`;
    printTable.push({ url, type: item.method });
    // 创建路由
    router[method](url, ...item.middleware, item.handler);
    // 更新 swagger 配置信息
    // swagger.paths[url] = {[method]:{}};
    // swagger.paths[url][item.method]=item.method;
  });
  console.log('\n 所有子接口列表:');
  console.table(printTable);
  return router;
};
