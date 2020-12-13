const {
    getUserRep,
    error
} = require("../../utils/functions");
const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'view-rep',
    description: 'Посмотреть репутацию у пользователя',
    category: 'Reputation',
    aliases: ['viewrep'],
    usage: '<@Пользователь>',
    async execute(message, args, bot) {
        const user =
            message.guild.members.cache.get(args[0]) ||
            message.mentions.members.first() ||
            message.member
        if(!user) return message.channel.send(error('Пользователь не найден!'))
        if(user.user.bot) return message.channel.send(error('Это бот. Зачем?'))

        const e1 = message.guild.id
        const e2 = user.id

        message.channel.send(new MessageEmbed()
            .setDescription(`У ${user} \`${getUserRep(e1, e2) || '0'}\` репутации.`))
    },
}