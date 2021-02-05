import context from 'koa/lib/context';
import { RouteMap, RequestMethod, RequestMap, APIType } from '../../decorator';
import LS from '../../localStroage';
import { apis, rootUrl } from "../../apis";

@RouteMap(apis.share.entry)
export default class Share {
  @RequestMap({ method: RequestMethod.POST, url: apis.share.updateUrl })
  async updateShareSetting(params) {
    console.log(params);
    const body = params.body;
    await LS.writeSchema(body);
    await LS.refreshSchema();
    return LS.readSchema();
  }

  @RequestMap({ method: RequestMethod.GET, url:  apis.share.refreshUrl })
  async refreshShareSetting(params, ctx) {
    const body = params.body;
    LS.refreshSchema();
  }

  @RequestMap({ method: RequestMethod.GET, url:  rootUrl })
  async getShareSetting() {
    return LS.readSchema();
  }
}
