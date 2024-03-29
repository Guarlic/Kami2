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
import { addTalk } from '../User/UserRecClass.js';

let prefix = process.env.PREFIX || '뉴꺠미야';

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

  let latency = client.ws.ping;

  logger.info(`현재 연결된 클라이언트의 핑은 ${latency}ms 입니다.`);

  // 접두사 지정
  prefix = process.env.PREFIX || '뉴꺠미야';

  // 유동 상테메세지

  let activitylist: ActivityOptions[] = [];

  setInterval(() => {
    // 핑 갱신하기
    latency = client.ws.ping;

    // List 갱신
    activitylist = [
      { name: `${latency}ms로 유저님의 말씀을 `, type: 'LISTENING' },
      {
        name: `${client.guilds.cache.size}개의 서버에서 함께 `,
        type: 'PLAYING',
      },
      { name: `뉴꺠미야 안녕`, type: 'LISTENING' },
    ];

    client.user?.setActivity(
      activitylist[Math.floor(Math.random() * activitylist.length)],
    );
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
  logger.info(
    `MsgRecv by ${msg.author.username} from ${
      msg.guild ? msg.guild?.name : 'null'
    }: ${msg.content}`,
  );

  // prefix로 시작 안하면 리턴
  if (!msg.content.startsWith(prefix)) {
    return;
  }

  // 커맨드 분할하기
  const Cmdelement: string[] = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  // 공백 체크
  if (Cmdelement[0] === null || Cmdelement[0] === undefined) {
    msg.reply('안냐쎄여! 전 꺠미에요! 그것도 뉴꺠미!');
    return;
  }

  // 커맨드 번들안에 있는가?
  const command = CommandBundle.find(value => value.name === Cmdelement[0]);

  if (command) {
    command.execute(msg, Cmdelement);
    addTalk(msg.author.id);
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
    await addTalk(msg.author.id);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ErrorInMsgProcess(msg: Message, err: any) {
  msg.reply(`Error Occured While Progress \n Error: ${err}`);
}

// #endregion
