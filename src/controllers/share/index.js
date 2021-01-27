import context from "koa/lib/context";
import { RouteMap, RequestMethod, RequestMap, APIType } from "../../decorator";

@RouteMap('/share')
export default class Share{
   @RequestMap({method:RequestMethod.GET, url:"/first-post", type: APIType.SSR})
   async genShareHtml(params, ctx){
        return 123;
  }


}


