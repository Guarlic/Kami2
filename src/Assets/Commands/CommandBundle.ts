/* eslint-disable no-unused-vars */
import { Message } from 'discord.js';
import { logger } from '../Utils/Logger.js';
import * as DBManager from '../Database/DBManager.js';

const CommandBundle: Map<string, Function> = new Map([
  [
    '안녕',
    async (msg: Message, Cmdelement: string[]) => {
      await msg.reply('녕안하세여!');
    },
  ],
  [
    '배워',
    async (msg: Message, Cmdelement: string[]) => {
      if (Cmdelement[1] == null || undefined) {
        msg.reply(`Element 1번이 주어지지 않았습니다.`);
        return;
      }

      if (Cmdelement[2] == null || undefined) {
        msg.reply(`Element 2번이 주어지지 않았습니다.`);
        return;
      }

      DBManager.AddCmdPromise(
        Cmdelement[1],
        msg.content.substring(msg.content.search(Cmdelement[2])),
        msg.author.id,
        `${msg.author.username}#${msg.author.discriminator}`,
      )
        .then(result => {
          msg.reply(`커맨드 등록 성공! ${Cmdelement[1]}`);
        })
        .catch(err => {
          logger.error(err);
        });
    },
  ],
]);

export default CommandBundle;
