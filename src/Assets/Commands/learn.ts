import { Message } from 'discord.js';
import { logger } from '../Utils/Logger.js';
import * as DBManager from '../Database/DBManager.js';

/**
 * 배워 함수
 * @param msg 메세지 넘기셈
 * @param Cmdelement 메세지 엘러먼트 넘기셈
 */
async function execute(msg: Message, Cmdelement: string[]) {
  // 널체크
  if (Cmdelement[1] == null || undefined) {
    msg.reply(`인자 1번을 내놓으시라우!`);
    return;
  }

  // 널체크2
  if (Cmdelement[2] == null || undefined) {
    msg.reply(`인자 2번 빨랑 주세여!!!!!!!!`);
    return;
  }

  // 1000자 블럭걸음
  if (msg.content.substring(msg.content.indexOf(Cmdelement[2])).length > 500) {
    msg.reply('어엇? 오백자가 넘네여? 제가 이해하기엔 너무 어려운거 가태영...');
    return;
  }

  // 커맨드 추가 가즈아!
  await DBManager.AddCmd(
    Cmdelement[1],
    msg.content.substring(msg.content.indexOf(Cmdelement[2])),
    msg.author.id,
    `${msg.author.username}#${msg.author.discriminator}`,
  )
    .then(async result => {
      // 와! 대성공!
      await msg.reply(`커맨드 등록 성공! ${Cmdelement[1]}`);
    })
    .catch(err => {
      // 에러가 나버렸네? 히히힛
      logger.error(err);
    });
}

export default execute;
