// 모듈 로드
import { Message } from 'discord.js';
import * as dotenv from 'dotenv';
import * as BotEvent from './Assets/BotEvent/BotEvent.js';
import { Connect as PgConnect } from './Assets/Database/PostgreManager.js';

// .env 로딩
dotenv.config();

PgConnect();
BotEvent.client.once('ready', () => BotEvent.Start());

BotEvent.client.on('messageCreate', async (msg: Message) => {
  BotEvent.MsgRecv(msg);
});

BotEvent.client.login(process.env.TESTTOKEN);
