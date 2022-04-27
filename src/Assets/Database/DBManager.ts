import mongoose from 'mongoose';
import { logger } from '../Utils/Logger.js';
import CmdSchema from './CmdSchema.js';
import UserSchema from './UserSchema.js';

export function Connect(dburl: string) {
  mongoose
    .connect(dburl, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      family: 4, // Use IPv4, skip trying IPv6
    })
    .then(() => logger.info('==> MongoDB Connected...'))
    .catch(err => logger.error(err));

  mongoose.connection.on('disconnected', Connect);
}

export async function FindUserData(userid: string) {}

export async function FindCmdData() {}

export async function AddUserData() {}

export async function AddCmdData() {}

export async function InitDB(dburl: string) {
  Connect(dburl);
}
