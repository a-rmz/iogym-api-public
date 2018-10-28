const {
  getSessionById,
  getSessionsByUser,
  getSessionFramesBySession,
} = require('./controller');
const {
  isArrayEmpty,
  isObjectEmpty,
  resJson,
  resNotFound,
} = require('../lib/utils');

module.exports.getSessionsByUser = async (params) => {
  const { pathParameters: { userId } } = params;
  const sessions = await getSessionsByUser(userId);

  if (isArrayEmpty(sessions)) {
    return resNotFound('Sessions');
  }
  const res = resJson(200, { sessions });
  console.log(res);
  return res;
};

module.exports.getSessionById = async (params) => {
  const { pathParameters: { sessionId } } = params;
  const session = await getSessionById(sessionId);

  if (isObjectEmpty(session)) {
    return resNotFound('Session');
  }
  return resJson(200, { session });
};

module.exports.getFramesBySession = async (params) => {
  const { pathParameters: { sessionId } } = params;
  const frames = await getSessionFramesBySession(sessionId);

  if (isArrayEmpty(frames)) {
    return resNotFound('Session frames');
  }
  return resJson(200, { frames });
};
