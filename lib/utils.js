module.exports = {
  isObjectEmpty(obj) {
    return Object.keys(obj).length < 1;
  },
  isArrayEmpty(arr) {
    return arr.length < 1;
  },
  resJson(status, payload) {
    return {
      statusCode: status,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
  },
  resNotFound(resource) {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: `${resource} not found`,
    };
  },
};
