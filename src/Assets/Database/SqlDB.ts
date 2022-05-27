import pg from 'pg';
import logger from '../Utils/Logger.js';

const { Pool, Client } = pg;

const config = {
  connectionString: process.env.PGURL,
  // Beware! The ssl object is overwritten when parsing the connectionString
  ssl: {
    rejectUnauthorized: false,
  },
};

const client = new Client(config);
client.connect(err => {
  if (err) {
    logger.error(`Error Connecting: ${err.stack}`);
  } else {
    logger.info('Client connected');
    client.end();
  }
});

const pool = new Pool(config);

pool
  .connect()
  .then(async poolclient => {
    logger.info('Pool connected');

    poolclient
      .query({
        text: "SELECT * FROM talkcount where userid='780771337332981780'",
      })
      .then(res => {
        poolclient.release();
        logger.info(res.rows[0].value);
      })
      .catch(err => {
        poolclient.release();
        logger.error(`Query Error: ${err.stack}`);
      });
  })
  .catch(err => logger.error(`Error Connecting: ${err.stack}`))
  .then(() => pool.end());
