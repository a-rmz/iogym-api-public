const {
  getSessionById,
  getSessionsByUser,
  getSessionFramesBySession,
  updateSessionById,
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
  return resJson(200, { sessions });
};

module.exports.getSessionById = async (params) => {
  const { pathParameters: { sessionId }, body } = params;
  const session = await getSessionById(sessionId, body);

  if (isObjectEmpty(session)) {
    return resNotFound('Session');
  }
  return resJson(200, { session });
};

module.exports.updateSessionById = async (params) => {
  const { pathParameters: { sessionId }, body } = params;
  const parsedBody = JSON.parse(body);
  const session = await updateSessionById(sessionId, parsedBody);

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
