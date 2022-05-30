import { Message } from 'discord.js';
import { client } from '../BotEvent/BotEvent.js';

async function execute(msg: Message, Cmdelement: string[]) {
  msg.reply(
    `저는 '${msg.author.username}'님과 ${client.ws.ping}ms로 소통중이에요!`,
  );
}

export default execute;
