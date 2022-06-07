import { Message } from 'discord.js';
import { client } from '../BotEvent/BotEvent.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  name: '핑',
  description: '꺠미가 얼마나 민첩한지 보여줘요!',
  execute: async (msg: Message, Cmdelement: string[]) => {
    msg.reply(
      `저는 '${msg.author.username}'님과 ${client.ws.ping}ms로 소통중이에요!`,
    );
  },
};

export default command;
