const {
    findMember,
    getUserRep,
    timer,
    getMarry
} = require('../../utils/functions')
const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "profile",
    description: "Профиль",
    usage: "[Пользователь]",
    category: "info",
    aliases: ['профиль'],
    async execute(message, args, bot) {
        const user = await findMember(message, args.join(' '), true).user
        const embed = new MessageEmbed()
        .setTitle('Профиль ' + user.tag)
        .addField('Репутация', `**${timer(getUserRep(message.guild.id, user.id) || 0, ['репутация', 'репутации', 'репутации'])}**`, true)

        if(getMarry(message.guild.id, user.id)) embed.addField('Брак', `В браке с **${bot.users.cache.get(getMarry(message.guild.id, user.id)).tag}**`, true)

        message.channel.send(embed)
    }
};
