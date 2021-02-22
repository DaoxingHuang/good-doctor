export const v2 = 'v3';

export const V1 = 'v1';

export const rootUrl = '/';

export const localIP = '127.0.0.1';

export const Port = process.env.PORT || 8080;

export function getPrefix(version) {
  return `/api/${version}`;
}

export function getFullUrl(...args) {
  const argsAfter = args.map(item => {
    if (item.startsWith(rootUrl)) {
      const subString = item.substr(1, item.length - 1);
      return subString;
    }

    return item;
  });
  const prefix = getPrefix(V1);
  return prefix.concat(rootUrl).concat(argsAfter.join(rootUrl));
}

export function getLocalFullUrl(...args) {
  const argsAfter = args.map(item => {
    if (item.startsWith(rootUrl)) {
      const subString = item.substr(1, item.length - 1);
      return subString;
    }

    return item;
  });
  const prefix = getPrefix(V1);
  const finalUrl = `${localIP}:${Port}${prefix}${rootUrl}${argsAfter.join(rootUrl)}`;
  return finalUrl;
  // return localIP.concat(":").concat(`${Port}`).prefix.concat(rootUrl).concat(argsAfter.join(rootUrl));
}

export const apis = {
  share: {
    entry: '/share',
    updateUrl: '/update',
    refreshUrl: '/refresh',
  },
};

// export default class Share {
//     @RequestMap({ method: RequestMethod.POST, url: '/update' })
//     async updateShareSetting(params) {
//       console.log(params);
//       const body = params.body;
//       await LS.writeSchema(body);
//       return 123;
//     }

//     @RequestMap({ method: RequestMethod.GET, url: '/refresh' })
//     async refreshShareSetting(params, ctx) {
//       const body = params.body;
//       LS.refreshSchema();
//     }
//   }
