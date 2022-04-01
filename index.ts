// 모듈 로드, 중요 변수 선언
import { Client, Intents } from 'discord.js';
import * as DBManager from './Assets/MainStruct/DBManager';
import * as BotEvent from './Assets/BotEvent/BotEvent';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// eslint-disable-next-line no-unused-expressions
async () => {
  DBManager.InitDB();

  client.once('ready', () => {
    BotEvent.Start();
  });
};
