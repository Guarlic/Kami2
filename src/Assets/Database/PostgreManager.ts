import pg from 'pg';
import logger from '../Utils/Logger.js';

const { Pool, Client } = pg;

export const Connect = (): Promise<boolean> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise<boolean>(async (resolve, reject) => {
    try {
      const clientconfig: pg.ClientConfig = {
        connectionString: process.env.DATABASE_URL?.replace(
          'postgres',
          'postgresql',
        ).concat('', '?sslmode=require'),
        // Beware! The ssl object is overwritten when parsing the connectionString
        ssl: {
          rejectUnauthorized: false,
        },
      };
      const client = new Client(clientconfig);

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

export function getPool() {
  const poolconfig: pg.PoolConfig = {
    connectionString: process.env.DATABASE_URL?.replace(
      'postgres',
      'postgresql',
    ).concat('', '?sslmode=require'),
    // Beware! The ssl object is overwritten when parsing the connectionString
    ssl: {
      rejectUnauthorized: false,
    },
  };

  return new Pool(poolconfig);
}

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
