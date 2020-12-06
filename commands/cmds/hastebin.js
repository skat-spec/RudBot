const hastebin = require('hastebin-gen')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'hastebin',
    description: 'Написать свой текст в hastebin.com',
    aliases: ['haste'],
    cooldown: 10,
    usage: '<Ваш текст>',
    args: true,
    category: 'cmds',
    execute(message, args) {
        hastebin(args.join(' '), { extension: "txt" }).then(haste => {

            message.channel.send(new MessageEmbed()
            .setTitle(`Ваша ссылка: ${haste}`));
        }).catch(error => {
            message.channel.send(`Произошла ошибка: \n\n\`\`\`${error}\`\`\``);
        });

    }
  }