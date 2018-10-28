const db = require('../lib/db');

const getSessionsByUser = async (gymId) => {
  const query = {
    text: `
    SELECT s.session_id, s.description, s.start_time, s.end_time,
    d.device_id, dt.name AS device_type, g.gym_id, g.name AS gym_name
    FROM sessions AS s
    INNER JOIN devices AS d
    ON s.device_id = d.device_id
    INNER JOIN device_types AS dt
    ON d.device_type_id = dt.device_type_id
    INNER JOIN gyms AS g
    ON g.gym_id = d.gym_id
    INNER JOIN users AS u
    ON s.user_rfid_code = u.rfid_code
    WHERE u.user_id = $1;
    `,
    values: [gymId],
  };

  return db.get(query);
};

const getSessionById = async (sessionId) => {
  const query = {
    text: `
    SELECT *
    FROM sessions
    WHERE session_id = $1;
    `,
    values: [sessionId],
  };

  return db.get(query);
};

const getSessionFramesBySession = async (sessionId) => {
  const query = {
    text: `
    SELECT *
    FROM session_frames
    WHERE session_id = $1;
    `,
    values: [sessionId],
  };

  return db.get(query);
};

module.exports = {
  getSessionById,
  getSessionsByUser,
  getSessionFramesBySession,
};
