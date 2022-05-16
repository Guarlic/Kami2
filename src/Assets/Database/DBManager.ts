/* eslint-disable no-async-promise-executor */
import mongoose from 'mongoose';
import { logger } from '../Utils/Logger.js';
import { CmdClass, CmdModel } from './CmdSchema.js';
import { UserClass, UserModel } from './UserSchema.js';

export function Connect() {
  mongoose
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
/**
 *
 * @param userid 추가할 유저의 id
 * @returns 성공여부 boolean 값 리턴
 */
export const AddUser = (userid: string): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    await UserModel.create({ id: userid } as UserClass)
      // eslint-disable-next-line
      .then(result => {
        return true;
      })
      .catch(err => {
        reject(err);
      });
  });

// 커맨드 추가 Promise
/**
 *
 * @param cmdname 추가할 커맨드 이름
 * @param output 추가할 커맨드 아웃풋
 * @param informerid 추가할 커맨드 등록자 id
 * @param informernametag 추가할 커맨드 등록자의 nametag (형식: [유저id]#[태그]) (예: 마실롯인것이에요#7082 )
 * @returns
 */
export const AddCmd = (
  cmdname: string,
  output: string,
  informerid: string,
  informernametag: string,
): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    await CmdModel.create({
      CmdName: cmdname,
      output,
      informerid,
      informernametag,
    } as CmdClass)
      // eslint-disable-next-line
      .then(result => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });

// 커맨드 찾기 Promise
/**
 *
 * @param cmdname 찾을 커맨드 이름
 * @returns 결과값 리턴 (CmdClass 속성 가짐)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FindCmd = (cmdname: string): Promise<any> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new Promise<any>(async (resolve, reject) => {
    await CmdModel.find({ CmdName: cmdname })
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

/**
 *
 * @param cmdname 찾을 유저의 커맨드 이름
 * @param informerid 찾을 커맨드 등록자 id
 * @returns 결과값
 */
export const FindUsersCmd = (
  cmdname: string,
  informerid: string,
): Promise<any> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new Promise<any>(async (resolve, reject) => {
    await CmdModel.find({ CmdName: cmdname, informerid })
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

export const FindCmdbyId = (_id: string): Promise<any> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new Promise<any>(async (resolve, reject) => {
    await CmdModel.findOne({ _id })
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

// Promise로 교체 바람
export async function FindUserData(userid: string) {
  await UserModel.findOne({ id: userid })
    .exec()
    .then(async result => {
      if (!result) {
        await AddUser(userid);
        logger.info(`New User added, id : ${userid}`);
      }
    })
    .catch(err => {
      logger.error(err);
    });
}

/**
 *
 * @param _id 삭제할 커맨드 오브젝트의 ObjectId 값
 * @returns 성공여부 boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DeleteCmd = (_id: mongoose.Types.ObjectId): Promise<boolean> =>
  new Promise<boolean>(async (resolve, reject) => {
    await CmdModel.findByIdAndDelete({ _id })
      .exec()
      // eslint-disable-next-line
      .then(async result => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
