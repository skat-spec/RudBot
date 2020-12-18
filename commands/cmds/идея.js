const {
    MessageEmbed
} = require('discord.js');
let {
    prefix
} = require('../../config.json')
const {
    getServerPrefix,
    getServerIdeaChannel,
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
        const gSID = await getServerIdeaChannel(message.guild.id)
        prefix = getServerPrefix(message.guild.id) || prefix
        if(!gSID) return message.channel.send(error(`Канал для идей не установлен! \`${prefix}set-idea <#канал>\``));
        message.guild.channels.cache.get(gSID).send(`Идея от ${message.author}`, new MessageEmbed()
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
            message.channel.send(yes(`**Ваша идея:**\n\n${args.join(' ')}`))
        )
    }
};