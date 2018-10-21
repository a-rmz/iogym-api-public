const {
  addUserToGym,
  createUser,
  getUserById,
  getUsersByGym,
  removeUser,
  removeUserFromGym,
} = require('./controller');
const {
  isArrayEmpty,
  isObjectEmpty,
  resEmpty,
  resJson,
  resNotFound,
} = require('../lib/utils');

module.exports.getUsersByGym = async (params) => {
  const { pathParameters: { gymId } } = params;
  const users = await getUsersByGym(gymId);

  if (isArrayEmpty(users)) {
    return resNotFound('Gym');
  }
  return resJson(200, { users });
};

module.exports.addUserToGym = async (params) => {
  const { pathParameters: { gymId, userId }, body } = params;
  const parsedBody = JSON.parse(body);

  const success = await addUserToGym(userId, gymId, parsedBody.is_admin);

  if (!success) {
    return resNotFound('User or Gym');
  }
  return resEmpty(201);
};

module.exports.removeUserFromGym = async (params) => {
  const { pathParameters: { gymId, userId } } = params;

  const success = await removeUserFromGym(userId, gymId);

  if (!success) {
    return resNotFound('User or Gym');
  }
  return resEmpty(204);
};

module.exports.getUserById = async (params) => {
  const { pathParameters: { userId } } = params;
  const user = await getUserById(userId);

  if (isObjectEmpty(user)) {
    return resNotFound('User');
  }
  return resJson(200, { user });
};

module.exports.createUser = async (params) => {
  const { body } = params;
  const parsedBody = JSON.parse(body);

  const user = await createUser(parsedBody);

  if (isObjectEmpty(user)) {
    return resNotFound('User');
  }
  return resJson(201, { user });
};

module.exports.removeUser = async (params) => {
  const { pathParameters: { userId } } = params;

  const success = await removeUser(userId);

  if (!success) {
    return resNotFound('User');
  }
  return resEmpty(204);
};
