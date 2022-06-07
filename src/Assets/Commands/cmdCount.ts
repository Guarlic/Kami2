import { Message, MessageEmbed } from 'discord.js';
import logger from '../Utils/Logger.js';
import ICommand from '../Interfaces/ICommand.js';
import { CmdModel } from '../Database/CmdSchema.js';
import EmbedConfig from '../Utils/EmbedConfig.js';

const command: ICommand = {
  name: '지식개수',
  description: '꺠미가 알고있는 지식의 총 갯수를 알려줘요!',
  execute: async (msg: Message, Cmdelement: string[]) => {
    CmdModel.countDocuments()
      .exec()
      .then(number => {
        const embed = new MessageEmbed()
          .setColor(EmbedConfig.color)
          .setTitle(`꺠미의 지식크기는 ${number}개!`)
          .setAuthor(EmbedConfig.author);

        // 답장
        msg.reply({ embeds: [embed] });
      });
  },
};

export default command;
