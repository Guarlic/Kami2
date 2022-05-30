/* eslint-disable no-unused-vars */
import { Message } from 'discord.js';
import teach from './teach.js';
import forget from './forget.js';
import talkcount from './TalkCount.js';
import ping from './ping.js';
import teachCount from './teachCount.js';
import forgetCount from './forgetCount.js';

// eslint-disable-next-line @typescript-eslint/ban-types
const CommandBundle: Map<string, Function> = new Map([
  [
    '배워',
    async (msg: Message, Cmdelement: string[]) => {
      await teach(msg, Cmdelement);
    },
  ],
  [
    '잊어',
    async (msg: Message, Cmdelement: string[]) => {
      await forget(msg, Cmdelement);
    },
  ],
  [
    '대화한횟수',
    async (msg: Message, Cmdelement: string[]) => {
      await talkcount(msg, Cmdelement);
    },
  ],
  [
    '가르친횟수',
    async (msg: Message, Cmdelement: string[]) => {
      await teachCount(msg, Cmdelement);
    },
  ],
  [
    '잊게한횟수',
    async (msg: Message, Cmdelement: string[]) => {
      await forgetCount(msg, Cmdelement);
    },
  ],
  [
    '핑',
    async (msg: Message, Cmdelement: string[]) => {
      await ping(msg, Cmdelement);
    },
  ],
]);

export default CommandBundle;
