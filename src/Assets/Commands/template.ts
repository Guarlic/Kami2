import { Message } from 'discord.js';
import logger from '../Utils/Logger.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  name: 'Template',
  description: 'Template',
  execute: async (msg: Message, Cmdelement: string[]) => {
    msg.reply('Template');
  },
};

export default command;
