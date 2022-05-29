import pg from 'pg';
import logger from '../Utils/Logger.js';

const { Pool, Client } = pg;

const config = {
  connectionString:
    'postgresql://hwwvkkximhiquc:9f3f4e252f12d855a243b999a2defec638e24c6e02438f790157f8cb4167d710@ec2-52-204-195-41.compute-1.amazonaws.com:5432/d60opoelqj6te7',
  // Beware! The ssl object is overwritten when parsing the connectionString
  ssl: {
    rejectUnauthorized: false,
  },
};

export const Connect = (): Promise<boolean> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise<boolean>(async (resolve, reject) => {
    try {
      const client = new Client(config);

      client.connect(err => {
        if (err) {
          logger.error(`Error Connecting: ${err.stack}`);
        } else {
          logger.info('Client connected');
          resolve(true);
        }
      });
    } catch {
      // eslint-disable-next-line no-unused-expressions
      (err: any) => {
        logger.error(err.stack);
        reject(err);
      };
    }
  });

export const pool = new Pool(config);

/*
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
*/
