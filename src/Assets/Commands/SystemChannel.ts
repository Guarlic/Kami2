import { Message } from 'discord.js';
import logger from '../Utils/Logger.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  name: '시스템채널',
  description: 'Template',
  execute: async (msg: Message, Cmdelement: string[]) => {
    msg.reply(msg.guild?.systemChannel?.name as string);
  },
};

export default command;
