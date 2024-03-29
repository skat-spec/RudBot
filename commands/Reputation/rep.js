const {
    findMember,
    getUserRep,
    setUserRep,
    addUserRep,
    error
} = require("../../utils/functions");
const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'rep',
    description: 'Поднять репутацию пользователю',
    args: true,
    category: 'Reputation',
    cooldown: 300,
    aliases: ['reputation'],
    usage: '<@Пользователь>',
    async execute(message, args, bot) {
        const user = findMember(message, args.join(' ')).user
        if(!user) return message.channel.send(error('Пользователь не найден!'))
        if(user.bot) return message.channel.send(error('Это бот. Зачем?'))
        if(user.id === message.author.id) return message.channel.send(error('Вы не можете выдать себе репутацию'))

        const e1 = message.guild.id
        const e2 = user.id

        const userRep = await getUserRep(e1, e2);
        if(userRep === null || !userRep) {
            setUserRep(e1, e2, 1)
            message.channel.send(new MessageEmbed()
                .setDescription(`Вы повысили репутацию ${user}! Теперь у него \`${userRep + 1}\` репутации.`))
            return
        }
        addUserRep(e1, e2, 1)
        message.channel.send(new MessageEmbed()
            .setDescription(`Вы повысили репутацию ${user}! Теперь у него \`${userRep + 1}\` репутации.`))
    },
}