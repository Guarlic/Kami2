/* eslint-disable no-unused-vars */
import { Message } from 'discord.js';
import learn from './learn.js';
import forget from './forget.js';
import achievement from './achievement.js';

// eslint-disable-next-line @typescript-eslint/ban-types
const CommandBundle: Map<string, Function> = new Map([
  [
    '배워',
    async (msg: Message, Cmdelement: string[]) => {
      await learn(msg, Cmdelement);
    },
  ],
  [
    '잊어',
    async (msg: Message, Cmdelement: string[]) => {
      await forget(msg, Cmdelement);
    },
  ],
  [
    '도전과제',
    async (msg: Message, Cmdelement: string[]) => {
      await achievement(msg, Cmdelement);
    },
  ],
]);

export default CommandBundle;
