// 모듈 로드
import { Message } from 'discord.js';
import * as dotenv from 'dotenv';
import * as BotEvent from './Assets/BotEvent/BotEvent.js';

// .env 로딩
dotenv.config();

const client = BotEvent.client;

client.once('ready', () => BotEvent.Start());

client.on('messageCreate', async (msg: Message) => {
  return BotEvent.MsgRecv(msg);
});

client.login(process.env.TOKEN);
