import { Message, EmbedFooterData, MessageEmbed } from 'discord.js';
import logger from '../Utils/Logger.js';
import { getPool } from '../Database/PostgreManager.js';
import EmbedConfig from '../Utils/EmbedConfig.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  name: '가르친 횟수',
  description:
    '유저님이 꺠미에게 지식을 가르쳐주신 횟수에요! 앞으로도 더 많이 가르쳐주세요! 꺠미는 지식에 언제나 목마르니까욧!',
  execute: async (msg: Message, Cmdelement: string[]) => {
    getPool()
      .connect()
      .then(async poolclient => {
        // 데이터 없으면 생성
        await poolclient.query(
          `INSERT INTO teachcount VALUES ('${msg.author.id}',0) ON CONFLICT (userid) DO NOTHING;`,
        );

        // 데이터 조회
        const res2 = await poolclient.query(
          `SELECT * FROM teachcount where userid='${msg.author.id}'`,
        );

        poolclient.release();

        // 임베드 생성
        const footerdata: EmbedFooterData = {
          text: '앞으로도 많이 가르쳐 주세요!',
        };

        const embed = new MessageEmbed()
          .setColor(EmbedConfig.color)
          .setTitle(`${msg.author.username}님이 가르친 횟수`)
          .setAuthor(EmbedConfig.author)
          .setDescription(`${res2.rows[0].value}번`)
          .setFooter(footerdata);

        // 답장
        msg.reply({ embeds: [embed] });
      })
      .catch(err => {
        logger.error(`Error: ${err.stack}`);
      });
  },
};

export default command;
