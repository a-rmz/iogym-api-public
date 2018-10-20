const { Client } = require('pg');

const getClient = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,
  });
  await client.connect();
  return client;
};

const get = async (query) => {
  const client = await getClient();

  try {
    const response = await client.query(query);
    return response.rows;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getOne = async (query) => {
  const client = await getClient();

  try {
    const response = await client.query(query);
    return response.rows[0];
  } catch (e) {
    console.error(e);
    return {};
  }
};

module.exports = {
  get,
  getOne,
};
