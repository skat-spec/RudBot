const {
    MessageEmbed
} = require('discord.js');
const {
    findMember
} = require("../../utils/functions");

module.exports = {
    name: 'avatar',
    description: 'Ава пользователя',
    cooldown: 5,
    aliases: ['ава', 'аватар', 'ava'],
    category: 'cmds',
    usage: '[@Пользователь/ID]',
    execute(message, args, bot) {
        const member = findMember(message, args.join(' '), true).user
        message.channel.send(new MessageEmbed()
            .setAuthor(member.tag)
            .setDescription(`[PNG](${member.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' })}) / [JPG](${member.displayAvatarURL({ size: 2048, dynamic: true, fomat: 'jpg' })}) / [GIF](${member.displayAvatarURL({ size: 2048, dynamic: true, fomat: 'gif' })}) `)
            .setImage(member.displayAvatarURL({
                size: 2048,
                dynamic: true
            })));
    },
};