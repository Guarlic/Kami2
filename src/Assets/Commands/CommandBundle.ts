/* eslint-disable no-unused-vars */
import { Message } from 'discord.js';
import teach from './teach.js';
import forget from './forget.js';
import talkcount from './TalkCount.js';

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
]);

export default CommandBundle;
