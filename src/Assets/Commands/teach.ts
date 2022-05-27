import { Message } from 'discord.js';
import logger from '../Utils/Logger.js';
import * as DBManager from '../Database/DBManager.js';
import { check } from '../korcen/korcen.js';

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

  const teachkeyword = Cmdelement[1];
  const teachinfo = msg.content.substring(msg.content.indexOf(Cmdelement[2]));

  // 1000자 블럭걸음
  if (teachinfo.length > 500) {
    msg.reply('어엇? 오백자가 넘네여? 제가 이해하기엔 너무 어려운거 가태영...');
    return;
  }

  // 불건전한 내용 감지하기
  if (check(teachinfo) || check(teachkeyword)) {
    msg.reply(
      'Korcen 라이브러리 검색 결과 유해 단어가 포함되어있는걸로 검사되었습니다. 의문점은 소작농 작업실에서 문의해주시기 바랍니다. ',
    );
    return;
  }

  // 커맨드 추가 가즈아!
  await DBManager.AddCmd(
    teachkeyword,
    teachinfo,
    msg.author.id,
    `${msg.author.username}#${msg.author.discriminator}`,
  )
    .then(async () => {
      // 답장
      await msg.reply(`커맨드 등록 성공! ${teachkeyword}`);
    })
    .catch(err => {
      // 에러
      logger.error(err);
    });
}

export default execute;
