/* eslint-disable no-use-before-define */
// #region import/declare
// 수많은 이 임포트들 역겹다
import {
  Client,
  Intents,
  Message,
  MessageEmbed,
  EmbedFooterData,
  Interaction,
} from 'discord.js';
import { logger } from '../Utils/Logger.js';
import * as DBManager from '../Database/DBManager.js';
import CommandBundle from '../Commands/CommandBundle.js';
import EmbedConfig from '../Utils/EmbedConfig.js';

const prefix = '테베야';

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// #endregion

// #region 이 수많은 함수들 개역겹 우욱...

/**
 * 그냥 봇 스타트 되면 호출하는 함수다
 */
export async function Start() {
  logger.info(`Bot Start`);
  await DBManager.Connect();
}

/**
 * 메세지 감지 함수임
 * @param msg 주석달기 개빡 ㅡ.ㅡ 메세지 넘겨 ㅅㄱ
 */
export async function MsgRecv(msg: Message) {
  // 봇 체크ㅌ
  if (msg.author.bot) {
    return;
  }

  // 메세지 감지
  logger.info(`MsgRecv by ${msg.author.username}: ${msg.content}`);

  // prefix 로 시작하는지 확인하기
  if (msg.content.startsWith(prefix)) {
    // 커맨드 분할하기
    const Cmdelement: string[] = msg.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);

    // 커맨드 번들안에 있는가?
    if (CommandBundle.has(Cmdelement[0])) {
      CommandBundle.get(Cmdelement[0])?.call(null, msg, Cmdelement);
      return;
    }

    // 만약 없다면 명령어 디비에 있는가?
    await DBManager.FindCmd(Cmdelement[0])
      // eslint-disable-next-line consistent-return
      .then(result => {
        // 없으면 몰루? 하고 리턴 때려버려 확 그냥
        if (result[0] === null || result[0] === undefined) {
          return msg.reply(`흠.. ${Cmdelement[0]}이란.. 그게 뭐죵? 몰루?`);
        }

        // 만약 여러개 있으면 랜덤으로 뽑기해서 추출
        const resultlength = result.length;
        const resultnum = Math.floor(Math.random() * resultlength);
        const footerdata: EmbedFooterData = {
          text: `${result[resultnum].informernametag}님이 알려주셨어요!`,
        };

        // 임베드 뚝딱해서
        const embed = new MessageEmbed()
          .setColor(EmbedConfig.color)
          .setTitle(Cmdelement[0])
          .setAuthor(EmbedConfig.author)
          .setDescription(result[resultnum].output)
          .setFooter(footerdata);

        // 답장을 한다쿠다!
        msg.reply({ embeds: [embed] });
      })
      .catch(err => {
        logger.error(err);
        ErrorInMsgProcess(msg, err);
      });
  }
}

/**
 * 주석 개귀찮, 쨋든 인터랙션 감지 함수
 * @param interaction 인터랙션 넘기셈 알아서 눈치껏 ALZALTAKALSEN
 */
export async function InterAcRecv(interaction: Interaction) {
  logger.info(interaction);
}

/**
 * 에러가 나면 에라났다고 reply 라도 하라고 착한 마실롯이 만든 함수
 * @param msg 메세지 넘기셈 받은거 그냥
 * @param err 에러 넘기셈
 */
async function ErrorInMsgProcess(msg: Message, err: any) {
  msg.reply(`Error Occured While Progress \n Error: ${err}`);
}

// #endregion
