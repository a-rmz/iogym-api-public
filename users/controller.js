const db = require('../lib/db');

const getUsersByGym = async (gymId) => {
  const query = {
    text: `
    SELECT u.user_id, u.rfid_code, u.first_name, u.last_name, u.email, u.birthday
    FROM users AS u
    INNER JOIN user_gym
    ON u.user_id = user_gym.user_id
    WHERE user_gym.gym_id = $1
    `,
    values: [gymId],
  };

  return db.get(query);
};

const getUserById = async (userId) => {
  const query = {
    text: `
    SELECT *
    FROM users
    WHERE user_id = $1
    `,
    values: [userId],
  };

  return db.getOne(query);
};

const createUser = async ({
  rfid_code, first_name, last_name, email, birthday,
}) => {
  const query = {
    text: `
    INSERT INTO users
    (rfid_code, first_name, last_name, email, birthday)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    values: [rfid_code, first_name, last_name, email, birthday],
  };

  return db.create(query);
};

const removeUser = async (userId) => {
  const query = {
    text: `
    DELETE
    FROM users
    WHERE user_id = $1
    `,
    values: [userId],
  };

  return db.delete(query);
};

const removeUserFromGym = async (userId, gymId) => {
  const query = {
    text: `
    DELETE
    FROM user_gym
    WHERE user_gym.gym_id = $2
    AND user_gym.user_id = $1
    `,
    values: [userId, gymId],
  };

  return db.delete(query);
};

const addUserToGym = async (userId, gymId, isAdmin = false) => {
  const query = {
    text: `
    INSERT INTO user_gym (user_id, gym_id, is_admin)
    VALUES ($1, $2, $3);
    `,
    values: [userId, gymId, isAdmin],
  };

  return db.createRelationship(query);
};

module.exports = {
  addUserToGym,
  createUser,
  getUserById,
  getUsersByGym,
  removeUser,
  removeUserFromGym,
};
