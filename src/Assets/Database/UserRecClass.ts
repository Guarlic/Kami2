import logger from '../Utils/Logger.js';
import { getPool } from '../Database/PostgreManager.js';

export const AddTalk = (userid: string): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    // 풀 연결
    getPool()
      .connect()
      .then(async poolclient => {
        // 데이터 없으면 생성
        await poolclient.query(
          `INSERT INTO talkcount VALUES ('${userid}',0) ON CONFLICT (userid) DO NOTHING;`,
        );

        // 조회
        const res2 = await poolclient.query(
          `SELECT * FROM talkcount where userid='${userid}'`,
        );

        // 업데이트
        await poolclient.query(
          `UPDATE talkcount SET value = ${
            res2.rows[0].value + 1
          } WHERE userid='${userid}'`,
        );

        poolclient.release();
      })
      .catch(err => {
        logger.error(`Error: ${err.stack}`);
        reject(err);
      })
      .then(() => {
        resolve(true);
      });
  });

export const imsibangpyeon = 0;
