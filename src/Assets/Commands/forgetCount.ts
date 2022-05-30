import { Message, EmbedFooterData, MessageEmbed } from 'discord.js';
import logger from '../Utils/Logger.js';
import { getPool } from '../Database/PostgreManager.js';
import EmbedConfig from '../Utils/EmbedConfig.js';

async function execute(msg: Message, Cmdelement: string[]) {
  getPool()
    .connect()
    .then(async poolclient => {
      // 데이터 없으면 생성
      await poolclient.query(
        `INSERT INTO forgetcount VALUES ('${msg.author.id}',0) ON CONFLICT (userid) DO NOTHING;`,
      );

      // 데이터 조회
      const res2 = await poolclient.query(
        `SELECT * FROM forgetcount where userid='${msg.author.id}'`,
      );

      poolclient.release();

      // 임베드 생성
      const footerdata: EmbedFooterData = {
        text: '앞으로도 많이 잊게 하지는 마세요!',
      };

      const embed = new MessageEmbed()
        .setColor(EmbedConfig.color)
        .setTitle(`${msg.author.username}님이 잊게한 횟수`)
        .setAuthor(EmbedConfig.author)
        .setDescription(`${res2.rows[0].value}번`)
        .setFooter(footerdata);

      // 답장
      msg.reply({ embeds: [embed] });
    })
    .catch(err => {
      logger.error(`Error: ${err.stack}`);
    });
}

export default execute;
