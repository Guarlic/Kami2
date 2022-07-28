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

// 프로덕션 모드이면 뉴꺠미 토큰 사용
if (process.env.NODE_ENV === 'production') {
  BotEvent.client.login(process.env.TOKEN);
} // 아니면 테스트토큰 사용
else {
  BotEvent.client.login(process.env.TESTTOKEN);
}
