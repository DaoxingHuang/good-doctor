import Koa from 'koa';
import next from 'next';
// const next = require('next')

import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import route from './routers';
import { isDevelopment } from './util/env';
import LS from './localStroage';

const nextService = next({ dev: isDevelopment() });
const handle = nextService.getRequestHandler();
const app = new Koa();
console.log(process.env.NODE_ENV);
if(isDevelopment()){
     
    // const webpack = require("webpack");
    // const webpackConfig = require("../webpack/webpack.config");
    // const devMiddleware = require("../webpack/devMiddleware");
    // const hotMiddleware = require('../webpack/hotMiddleware');

    // const compiler = webpack(webpackConfig);
    // app.use(devMiddleware(compiler));
    // app.use(hotMiddleware(compiler));
}
// const router = new Router();
// initRouter(router);
const constRouter = route();

app.use(compress());
app.use(bodyparser());
app.use(constRouter.routes()).use(constRouter.allowedMethods());

app.use(async (ctx, next) => {
  ctx.req.state = {};
  ctx.req.state.loaclMemory = { schemaConfig: LS.schemas };
  await next();
});
nextService.prepare().then(() => {
  // app.context.next = nextService;
  // app.context.loaclMemory = {schemaConfig: LS.schemas};

  // app.context.state.localMemory = {}
  app.use(async (ctx, next) => {
    // use req state pass meomry
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  console.log('Next Service SSR is ready for using...');
});

app.listen(process.env.PORT||8080);
