/* eslint-disable no-unused-vars */
import { Message } from 'discord.js';
import ICommand from '../Interfaces/ICommand.js';
import teach from './teach.js';
import forget from './forget.js';
import talkCount from './talkCount.js';
import ping from './ping.js';
import teachCount from './teachCount.js';
import forgetCount from './forgetCount.js';
import cmdCount from './cmdCount.js';

const CommandBundle: ICommand[] = [
  teach,
  forget,
  talkCount,
  ping,
  teachCount,
  forgetCount,
  cmdCount,
];

export default CommandBundle;
