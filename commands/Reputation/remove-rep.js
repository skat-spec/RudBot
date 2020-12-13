const {
    remUserRep,
    getUserRep,
    error,
    timer
} = require("../../utils/functions");
const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'remove-rep',
    description: 'Убрать репутацию у пользователя',
    category: 'Reputation',
    aliases: ['removerep', 'delete-rep', 'delrep', 'deleterep', 'remrep'],
    usage: '<@Пользователь>',
    async execute(message, args, bot) {
        const user =
            message.guild.members.cache.get(args[0]) ||
            message.mentions.members.first()
        const amount = args[1]
        const e1 = message.guild.id
        const e2 = user.id

        if(message.author.id != '448799481777881089' && message.member.permissions.has(["MANAGE_MESSAGES"])) return message.channel.send(error('У вас нет прав! (Управлять сообщениями)'))
        if(!user) return message.channel.send(error('Пользователь не найден!'))
        if(user.user.bot) return message.channel.send(error('Это бот. Зачем?'))
        if(amount <= '0') return message.channel.send(error('А зачем?'))
        if(getUserRep(e1, e2) < amount) return message.channel.send(error(`У пользователя нет столько репутации! У него: ${timer(getUserRep(e1, e2), ['репутация', 'репутации', 'репутации'])}`))
        if(!parseInt(amount)) return message.channel.send(error(`\`${amount}\` не число!`))

        remUserRep(e1, e2, amount)
        message.channel.send(new MessageEmbed()
            .setDescription(`Вы успешно убрали ${timer(amount, ['репутацию', 'репутации', 'репутации'])} у пользователя`))
    },
}
