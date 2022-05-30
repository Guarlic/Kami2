import { EmbedAuthorData, EmbedFooterData } from 'discord.js';

const imageurl =
  'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676';

const authordata: EmbedAuthorData = {
  name: '킴꺠미',
  iconURL: imageurl,
};

const footerdata: EmbedFooterData = {
  text: '킴꺠미',
  iconURL: imageurl,
};

const EmbedConfig = {
  color: 0x434546,
  author: authordata,
  footer: footerdata,
};

export default EmbedConfig;
