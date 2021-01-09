const {
    MessageEmbed
} = require('discord.js');
const {
    error,
    yes
} = require("../../utils/functions");

module.exports = {
    name: 'идея',
    description: 'Отправить идею **НА СЕРВЕР**',
    cooldown: 120,
    args: true,
    usage: '<ваша идея>',
    category: 'cmds',
    async execute(message, args, bot) {
        const gSID = await message.guild.ideaChannel;
        const prefix = await message.guild.prefix;
        if(!gSID) return message.channel.send(error(`Канал для идей не установлен! \`${prefix}set-idea <#канал>\``));
        message.guild.channels.cache.get(gSID).send(`${message.guild.id === '681142809654591501' ? '<@&748859760270639126>, ' : ''}Идея от ${message.author}`, new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Идея')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(args.join(' '))
            .setTimestamp()
            .setFooter(`${prefix}идея`)).then((message) => {
                message.react("⬆")
                message.react("⬇")
            },
            message.channel.send(yes(`**Ваша идея:**\n${args.join(' ')}`))
        )
    }
};