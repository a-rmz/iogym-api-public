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

const getUserById = async (userId, gymId) => {
  const query = {
    text: `
    SELECT u.user_id, u.rfid_code, u.first_name, u.last_name, u.email, u.birthday
    FROM users AS u
    INNER JOIN user_gym
    ON u.user_id = user_gym.user_id
    WHERE user_gym.gym_id = $2
    AND user_gym.user_id = $1
    AND u.user_id = $1
    `,
    values: [userId, gymId],
  };

  return db.getOne(query);
};

module.exports = {
  getUsersByGym,
  getUserById,
};
