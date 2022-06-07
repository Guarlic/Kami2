import {
  Message,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  MessageComponentInteraction,
} from 'discord.js';
import mongoose from 'mongoose';
import logger from '../Utils/Logger.js';
import * as DBManager from '../Database/DBManager.js';
import { addForget } from '../User/UserRecClass.js';
import ICommand from '../Interfaces/ICommand.js';

const command: ICommand = {
  name: '잊어',
  description: '기억속에서 지워버려요!',
  execute: async (msg: Message, Cmdelement: string[]) => {
    // 널체크는 필수
    if (Cmdelement[1] === null || Cmdelement[1] === undefined) {
      msg.reply('Element 1번을 내놓으시오!');
      return;
    }

    // 디비에서 이 유저가 잊어버리라고 한거를 찾아라 일단
    await DBManager.FindUsersCmd(Cmdelement[1], msg.author.id)
      // eslint-disable-next-line consistent-return
      .then(async result => {
        // 없으면 없는뎂쇼? 라고 답하기
        if (result[0] === null || result[0] === undefined) {
          msg.reply(
            `제 머릿속을 샅샅이 뒤져봤지만 ${msg.author.username}님이 알려주신 '${Cmdelement[1]}'이란건 없는뎁쇼?`,
          );
          return;
        }

        // 옵션 배열
        const optionArray: Array<MessageSelectOptionData> = [];

        // 옵션들 배열에 넣기
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result.forEach((i: any) => {
          let description = '';
          if (i.output.length > 97) {
            description = `${i.output.substring(0, 97)}...`;
          } else {
            description = i.output;
          }
          optionArray.push({
            label: i.CmdName,
            description,
            // eslint-disable-next-line no-underscore-dangle
            value: `${i._id}`,
          });
        });

        // 선택 메뉴 생성
        const selectmenu = new MessageSelectMenu()
          .setCustomId(msg.id)
          .setPlaceholder('잊으라고 할것을 골라주세요!')
          .addOptions(optionArray);

        const row = new MessageActionRow().addComponents(selectmenu);

        // reply 된 메세지 id
        let replyedmsgid = '';

        // 답장
        msg
          .reply({
            content: '명령어 테스트!',
            components: [row],
          })
          .then(sent => {
            // reply 된 메세지 id 저장
            replyedmsgid = sent.id;
          });

        // 콜렉터 필터
        const filter = (i: MessageComponentInteraction) => {
          return i.customId === msg.id && i.user.id === msg.author.id;
        };

        // 컴포넌트 콜렉터 생성
        const collector = msg.channel.createMessageComponentCollector({
          filter,
          componentType: 'SELECT_MENU',
        });

        collector.on('collect', async i => {
          // 기존 선택 메세지 삭제
          msg.channel.messages.fetch(replyedmsgid).then(async message => {
            message.delete();

            // 메세지 삭제한 다음에 커맨드 본격적으로 지우기
            await DBManager.DeleteCmd(
              new mongoose.Types.ObjectId(i.values[0]),
            ).then(() => {
              // 성공했음 메세지 보내기
              msg.channel.send(`${Cmdelement[1]}를 삭제했어요!`);
              addForget(msg.author.id);
            });
          });
        });

        collector.on('end', collected => {
          msg.channel.messages.fetch(replyedmsgid).then(async message => {
            message.delete();
            msg.channel.send('응답시간이 만료되었습니다. 다시 시도해주세요.');
          });
        });
      })
      .catch(err => {
        logger.error(`err: ${err}`);
      });
  },
};

export default command;
