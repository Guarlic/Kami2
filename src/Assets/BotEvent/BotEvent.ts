/* eslint-disable no-use-before-define */
// #region import/declare
// 임포트
import {
  Client,
  Intents,
  Message,
  MessageEmbed,
  EmbedFooterData,
  Interaction,
  EmbedAuthorData,
  ActivityOptions,
} from 'discord.js';
import logger from '../Utils/Logger.js';
import * as DBManager from '../Database/DBManager.js';
import CommandBundle from '../Commands/CommandBundle.js';
import EmbedConfig from '../Utils/EmbedConfig.js';
import { AddTalk } from '../Database/UserRecClass.js';

const prefix = '뉴꺠미야';

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// #endregion

// #region 봇 이벤트 함수

/**
 * 봇 스타트 함수
 */
export async function Start() {
  logger.info(`Bot Start`);
  await DBManager.Connect();

  setTimeout(() => {
    const latency = client.ws.ping;

    logger.info(`현재 연결된 클라이언트의 핑은 ${latency}ms 입니다.`);

    // 유동 상테메세지
    const activitylist: ActivityOptions[] = [
      { name: `${latency}ms로 유저님의 말씀을 `, type: 'LISTENING' },
      {
        name: `${client.guilds.cache.size}개의 서버에서 함께 `,
        type: 'PLAYING',
      },
      { name: `뉴꺠미야 안녕`, type: 'LISTENING' },
    ];

    // loop
    setInterval(() => {
      client.user?.setActivity(
        activitylist[Math.floor(Math.random() * activitylist.length)],
      );
    }, 5000);
  }, 5000);
}

/**
 * 메세지 감지 함수임
 * @param msg 메세지
 */
export async function MsgRecv(msg: Message) {
  // 봇 체크
  if (msg.author.bot) {
    return;
  }

  // 메세지 감지
  logger.info(`MsgRecv by ${msg.author.username}: ${msg.content}`);

  // prefix로 시작 안하면 리턴
  if (!msg.content.startsWith(prefix)) {
    return;
  }

  // 커맨드 분할하기
  const Cmdelement: string[] = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  // 커맨드 번들안에 있는가?
  if (CommandBundle.has(Cmdelement[0])) {
    CommandBundle.get(Cmdelement[0])?.call(null, msg, Cmdelement);
    AddTalk(msg.author.id);
    // 있으면 리턴
    return;
  }

  try {
    // Db에서 Fetch 해오기
    const result = await DBManager.FindCmd(Cmdelement[0]);

    if (result[0] === null || result[0] === undefined) {
      // eslint-disable-next-line consistent-return
      return msg.reply(`흠.. ${Cmdelement[0]}이란.. 그게 뭐죵? 몰루?`);
    }

    // 만약 여러개 있으면 랜덤으로 뽑기해서 추출
    const resultnum = Math.floor(Math.random() * result.length);

    // FooterData 생성
    const footerdata: EmbedFooterData = {
      text: `${result[resultnum].informernametag}님이 알려주셨어요!`,
    };

    // 임베드 생성
    const authordata: EmbedAuthorData = {
      name: '킴꺠미의 지식사전!',
      iconURL: EmbedConfig.author.iconURL,
    };

    const embed = new MessageEmbed()
      .setColor(EmbedConfig.color)
      .setTitle(Cmdelement[0])
      .setAuthor(authordata)
      .setDescription(result[resultnum].output)
      .setFooter(footerdata);

    // 답장
    msg.reply({ embeds: [embed] });

    // 대화한 횟수 추가
    await AddTalk(msg.author.id);
    return;
  } catch (err) {
    logger.error(err);
    ErrorInMsgProcess(msg, err);
  }
}

/**
 * 인터랙션 이벤트 함수
 * @param interaction 인터랙션
 */
export async function InterAcRecv(interaction: Interaction) {
  logger.info(interaction);
}

/**
 * 에러가 나면 에라났다고 reply 라도 하라고 착한 마실롯이 만든 함수
 * @param msg 메세지
 * @param err 에러
 */
async function ErrorInMsgProcess(msg: Message, err: any) {
  msg.reply(`Error Occured While Progress \n Error: ${err}`);
}

// #endregion
