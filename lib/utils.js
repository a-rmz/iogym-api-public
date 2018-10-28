const response = (status, headers = null) => ({
  statusCode: status,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    ...headers,
  },
});

module.exports = {
  isObjectEmpty(obj) {
    return !obj || Object.keys(obj).length < 1;
  },
  isArrayEmpty(arr) {
    return !arr || arr.length < 1;
  },
  resEmpty(status) {
    return {
      ...response(status),
    };
  },
  resJson(status, payload) {
    return {
      ...response(status, {
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
    };
  },
  resNotFound(resource) {
    return {
      ...response(404, {
        'Content-Type': 'text/plain',
      }),
      body: `${resource} not found`,
    };
  },
};
