const Discord = module.require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Ава пользователя',
    cooldown: 5,
    aliases: ['ава', 'аватар', 'ava'],
    category: 'cmds',
    usage: '[@Пользователь/ID]',
    execute(message, args, bot) {
        let member = bot.users.cache.get(args[0]) || message.mentions.users.first()
        if(!member) member = message.author
        const embed = new Discord.MessageEmbed()
            .setAuthor(member.tag)
            .setDescription(`[PNG](${member.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' })}) / [JPG](${member.displayAvatarURL({ size: 2048, dynamic: true, fomat: 'jpg' })}) / [GIF](${member.displayAvatarURL({ size: 2048, dynamic: true, fomat: 'gif' })}) `)
            .setImage(member.displayAvatarURL({
                size: 2048,
                dynamic: true
            }))
            .setColor("303136")
        message.channel.send(embed);
    },
};