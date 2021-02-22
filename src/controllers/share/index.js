import { RouteMap, RequestMethod, RequestMap } from '../../decorator';
import LS from '../../localStroage';
import { apis, rootUrl } from '../../apis';

@RouteMap(apis.share.entry)
export default class Share {
  @RequestMap({ method: RequestMethod.POST, url: apis.share.updateUrl })
  async updateShareSetting(params) {
    const { body } = params;
    LS.writeSchema(body);
    LS.refreshSchema();
    return LS.readSchema();
  }

  @RequestMap({ method: RequestMethod.GET, url: apis.share.refreshUrl })
  async refreshShareSetting() {
    LS.refreshSchema();
  }

  @RequestMap({ method: RequestMethod.GET, url: rootUrl })
  async getShareSetting() {
    return LS.readSchema();
  }
}
