const rp = require('request-promise');
const qs = 'qs';

module.exports = function fetch(method, url, body, config = {}) {
  const upperMethod = method.toString().toUpperCase();
  let fullUrl = url;

  const params = {
    method: upperMethod,
  };

  if (upperMethod === 'GET' || upperMethod === 'DELETE') {
    const strBody = qs.stringify(body);
    if (strBody.length) {
      fullUrl += `?${qs.stringify(body)}`;
    }
  } else if (typeof body === 'object') {
    params.body = JSON.stringify(body);
  } else {
    params.body = body;
  }

  params.headers = {
    'Content-Type': 'application/json',
  };
  // params.json = true;

  if (config.token) {
    params.headers['SHOP-AUTH-TOKEN'] = config.token;
  }

  return rp(fullUrl, params)
    .then((result) => {
    try{
      return JSON.parse(result);
    } catch(e) {
      return result;
    }
    //   const contentType = result.headers.get('Content-Type');
    //   const res = (contentType && contentType.toLowerCase().indexOf('application/json') !== -1)
    //     ? result.json()
    //     : result.text();
    //   const status = result.status;
    //   return (status >= 200 && status < 300)
    //     ? res
    //     : res.then(error => Promise.reject({ url, params, status, error }));
    });
};
