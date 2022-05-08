/* eslint-disable no-use-before-define */
import {
  Client,
  Intents,
  Message,
  MessageEmbed,
  EmbedAuthorData,
  EmbedFieldData,
  EmbedFooterData,
} from 'discord.js';
import { logger } from '../Utils/Logger.js';
import * as DBManager from '../Database/DBManager.js';
import CommandBundle from '../Commands/CommandBundle.js';
import EmbedConfig from '../Utils/EmbedConfig.js';

const prefix = '꺠미야';

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export async function Start() {
  logger.info(`Bot Start`);
  await DBManager.Connect();
}

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
      CommandBundle.get(Cmdelement[0])!.call(null, msg, Cmdelement);
    }

    // 만약 없다면 명령어 디비에 있는가?
    DBManager.FindCmdPromise(Cmdelement[0])
      .then(result => {
        const footerdata: EmbedFooterData = {
          text: `${result.informernametag}님이 알려주셨어요!`,
        };
        const embed = new MessageEmbed()
          .setColor(EmbedConfig.color)
          .setTitle(Cmdelement[0])
          .setAuthor(EmbedConfig.author)
          .setDescription(result.output)
          .setFooter(footerdata);
        msg.reply({ embeds: [embed] });
      })
      .catch(err => {
        logger.error(err);
        ErrorInProcess(msg, err);
      });
  }
}

async function ErrorInProcess(msg: Message, err: any) {
  msg.reply(`Error Occured While Progress \n Error: ${err}`);
}
