import { Message } from 'discord.js';

interface ICommand {
  name: string;
  description: string;
  execute: (msg: Message, Cmdelement: string[]) => Promise<void>;
}

export default ICommand;
