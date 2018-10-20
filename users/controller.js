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

const createUser = async (gymId, {
  rfid_code, first_name, last_name, email, birthday,
}) => {
  const query1 = {
    text: `
    INSERT INTO users
    (rfid_code, first_name, last_name, email, birthday)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    values: [rfid_code, first_name, last_name, email, birthday],
  };

  try {
    const user = await db.create(query1);
    const query2 = {
      text: `
      INSERT INTO user_gym (user_id, gym_id)
      VALUES ($1, $2);
      `,
      values: [user.user_id, gymId],
    };

    await db.create(query2);
    return user;
  } catch (e) {
    console.error(e);
    return {};
  }
};

module.exports = {
  getUsersByGym,
  getUserById,
  createUser,
};
