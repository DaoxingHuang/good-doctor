import context from 'koa/lib/context';
import { RouteMap, RequestMethod, RequestMap, APIType } from '../../decorator';
import LS from '../../localStroage';
@RouteMap('/share')
export default class Share {
  @RequestMap({ method: RequestMethod.POST, url: '/update' })
  async updateShareSetting(params) {
    console.log(params);
    const body = params.body;
    await LS.writeSchema(body);
    return 123;
  }

  @RequestMap({ method: RequestMethod.GET, url: '/refresh' })
  async refreshShareSetting(params, ctx) {
    const body = params.body;
    LS.refreshSchema();
  }
}
