/* eslint-disable no-async-promise-executor */
import mongoose from 'mongoose';
import { logger } from '../Utils/Logger.js';
import { CmdClass, CmdModel } from './CmdSchema.js';
import { UserClass, UserModel } from './UserSchema.js';

export function Connect() {
  mongoose
    .connect(process.env.DBURL!, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      family: 4, // Use IPv4, skip trying IPv6
    })
    .then(() => logger.info('==> MongoDB Connected...'))
    .catch(err => logger.error(err));

  mongoose.connection.on('disconnected', Connect);
}

// 유저 추가 Promise
export const AddUserPromise = (userid: string): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    await UserModel.create({ id: userid } as UserClass)
      // eslint-disable-next-line no-unused-vars
      .then(result => {
        return true;
      })
      .catch(err => {
        reject(err);
      });
  });

// 커맨드 추가 Promise

export const AddCmdPromise = (
  cmdname: string,
  output: string,
  informerid: string,
  informernametag: string,
  react?: string,
): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    await CmdModel.create({
      CmdName: cmdname,
      output,
      informerid,
      informernametag,
    } as CmdClass)
      // eslint-disable-next-line no-unused-vars
      .then(result => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });

// 커맨드 찾기 Promise

export const FindCmdPromise = (cmdname: string): Promise<any> =>
  new Promise<any>(async (resolve, reject) => {
    await CmdModel.findOne({ CmdName: cmdname })
      .exec()
      // eslint-disable-next-line consistent-return
      .then(async result => {
        if (!result) {
          return null;
        }
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });

export async function FindUserData(userid: string) {
  await UserModel.findOne({ id: userid })
    .exec()
    .then(async result => {
      if (!result) {
        await AddUserPromise(userid);
        logger.info(`New User added, id : ${userid}`);
      }
    })
    .catch(err => {
      logger.error(err);
    });
}
