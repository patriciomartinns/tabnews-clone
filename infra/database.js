import { Client } from "pg";

function getEnvState() {
  return process.env.NODE_ENV === "production" ? true : false;
}

async function getClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getEnvState(),
  });

  await client.connect();

  return client;
}

async function query(queryObject) {
  let client;

  try {
    client = await getClient();
    return await client.query(queryObject);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client?.end();
  }
}

const database = {
  query,
  getClient,
};

export default database;
