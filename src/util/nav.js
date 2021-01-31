/**
 * get deveice platform
 * @author Daoxing.Huang
 * @function
 * @see @link https://blog.csdn.net/jie_rookie/article/details/89204123
 * @namespace {Util}
 * @export
 */
export const deviceBrowser = () => {
  const u = getUA();
  return {
    trident: u.indexOf('Trident') > -1, //IE
    presto: u.indexOf('Presto') > -1, //opera
    webKit: u.indexOf('AppleWebKit') > -1, //safari or chroome
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //firefox
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //mobile
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/), //ios
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android or uc
    iPhone: u.indexOf('iPhone') > -1, // iphone
    iPad: u.indexOf('iPad') > -1, //iPad
    webApp: u.indexOf('Safari') == -1, //Safari
    weixin: u.indexOf('MicroMessenger') > -1, //weixin
    qq: u.match(/\sQQ/i) == ' qq', //qq
  };
};

/**
 * get user agent
 *
 * @export
 * @return {Object} user agent value
 */
export function getUA() {
  return window && window.navigator.userAgent;
}
