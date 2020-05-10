function parseError(error, status) {
  if (error && error.message) {
    throw new Error(error.message);
  }

  switch (status) {
    case 400:
      throw new Error('Неверные данные запроса (400)');
    case 500:
      throw new Error('Внутренняя ошибка сервера (500)');
    default:
      throw new Error('Неизвестная ошибка');
  }
}

async function fetchHelper(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  let result;
  if (text) {
    result = JSON.parse(text);
  }

  if (!response.ok) {
    parseError(result, response.status);
  }
  return result;
}

async function get(url, params) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Accept-Charset', 'utf-8');

  const options = {
    method: 'GET',
    headers,
  };
  let fullUrl = url;
  if (params) {
    const urlParams = Object.keys(params).map((key) => (
      `${key}=${params[key]}`
    ));
    if (urlParams.length) {
      fullUrl += `?${urlParams.join('&')}`;
    }
  }

  const result = await fetchHelper(fullUrl, options);
  return result;
}

async function post(url, payload) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Accept-Charset', 'utf-8');
  headers.append('Content-type', 'application/json');

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  };
  const fullUrl = url;
  const result = await fetchHelper(fullUrl, options);
  return result;
}

export default {
  get,
  post,
};
