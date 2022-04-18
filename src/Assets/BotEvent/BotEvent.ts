import { Client, Intents, Message } from 'discord.js';
import { logger } from '../Utils/Logger.js';
import * as DBManager from '../Database/DBManager.js';

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export async function Start(dburl: string) {
  logger.info(`Bot Start`);
  DBManager.Connect(dburl);
}

// eslint-disable-next-line no-unused-vars
export async function MsgRecv(msg: Message) {
  if (msg.author.bot) {
    return;
  }

  logger.info(`MsgRecv by ${msg.author.username}: ${msg.content}`);

  DBManager.FindUserData();
}
