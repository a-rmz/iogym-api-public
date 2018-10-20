const { getUserById, getUsersByGym } = require('./controller');
const {
  isArrayEmpty, isObjectEmpty,
  resJson, resNotFound,
} = require('../lib/utils');

module.exports.getUsersByGym = async (params) => {
  const { pathParameters: { gymId } } = params;
  const users = await getUsersByGym(gymId);

  if (isArrayEmpty(users)) {
    return resNotFound('Gym');
  }
  return resJson(200, { users });
};

module.exports.getUserById = async (params) => {
  const { pathParameters: { gymId, userId } } = params;
  const user = await getUserById(userId, gymId);

  if (isObjectEmpty(user)) {
    return resNotFound('User');
  }
  return resJson(200, { user });
};
