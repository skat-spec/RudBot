const {
    getUserRep,
    setUserRep,
    addUserRep,
    error
  } = require("../../utils/functions");
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'rep',
    description: 'Поднять репутацию пользователю',
    args: true,
    category: 'Reputation',
    cooldown: 300,
    aliases: ['reputation'],
    usage: '<@Пользователь> [-v (Посмотреть сколько репутации)]',
    async execute(message, args, bot) {
        const user =
        message.guild.members.cache.get(args[0]) ||
        message.mentions.members.first()
        if(!user) return message.channel.send(error('Пользователь не найден!'))
        if(user.user.bot) return message.channel.send(error('Это бот. Зачем?'))

        const e1 = message.guild.id
        const e2 = user.id

        if(message.content.endsWith('-v' || '-w' || '-V' || '-W' || '-view' || '-View')) return message.channel.send(new MessageEmbed()
        .setDescription(`У ${user} \`${getUserRep(e1, e2) || '0'}\` репутации.`))
        else if(user.id === message.author.id) {
            message.channel.send(error('Вы не можете выдать себе репутацию'))
             
        return}

        const userRep = await getUserRep(e1, e2);
        if (userRep === null || !userRep) {
            setUserRep(e1, e2, 1)
            message.channel.send(new MessageEmbed()
        .setDescription(`Вы повысили репутацию ${user}! Теперь у него \`${userRep + 1}\` репутации.`))
        return}
        addUserRep(e1, e2, 1)
        message.channel.send(new MessageEmbed()
        .setDescription(`Вы повысили репутацию ${user}! Теперь у него \`${userRep + 1}\` репутации.`))
    },
}