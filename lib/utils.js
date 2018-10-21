module.exports = {
  isObjectEmpty(obj) {
    return !obj || Object.keys(obj).length < 1;
  },
  isArrayEmpty(arr) {
    return !arr || arr.length < 1;
  },
  resEmpty(status) {
    return {
      statusCode: status,
    };
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
