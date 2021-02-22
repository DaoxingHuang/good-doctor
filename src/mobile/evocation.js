import { deviceBrowser } from '../util/nav';

export default schema => {
  const os = deviceBrowser();
  let cSchema = schema.schema;
  const searchParams = window.location.search;
  cSchema && (cSchema += searchParams);
  window.location.href = cSchema;
  setTimeout(() => {
    const hidden =
      window.document.hidden ||
      window.document.mozHiddden ||
      window.document.msHiddden ||
      window.document.webkitHiddden;
    if (!hidden) {
      os.ios && (window.location.href = schema.ios);
      os.android && (window.location.href = schema.android);
    }
  }, 3000);
};
