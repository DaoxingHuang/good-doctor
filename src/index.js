
import Koa from "koa";
import next from "next";
// const next = require('next')

import bodyparser from "koa-bodyparser"
import compress from "koa-compress"
import route from "./routers";
import { isDevelopment } from "./util/env";

const nextService = next({ dev:isDevelopment() })
const handle = nextService.getRequestHandler();
const app = new Koa();
const constRouter = route();
app.use(compress());
app.use(bodyparser({formLimit: '100M', textLimit:'100M', jsonLimit:'100M'}));
app.use(constRouter.routes()).use(constRouter.allowedMethods());

nextService.prepare().then(()=>{
    app.context.next = nextService;

    app.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
      });
    console.log('Next Service SSR is ready for using...');
});

app.listen(3000);



