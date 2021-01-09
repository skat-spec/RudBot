﻿const {
    MessageEmbed
} = require('discord.js');
const {
    emoji
} = require('../../data/emojis.json')

module.exports = {
    name: 'ping',
    description: 'Проверка пинга бота',
    cooldown: 5,
    category: 'cmds',
    aliases: ['пинг', 'понг', 'pong'],
    execute(message, args, bot) {
        var ping = Date.now() - message.createdTimestamp
        let stat = emoji.online
        if(ping >= 500) stat = emoji.idle
        if(ping >= 1000) stat = emoji.dnd

        let discordemoji = emoji.online
        if(bot.ws.ping >= 400) discordemoji = emoji.idle
        if(bot.ws.ping >= 900) discordemoji = emoji.dnd

        message.channel.send(new MessageEmbed()
            .setColor("303136")
            .setTitle('Пинг')
            .setDescription(`Ответ на команды: ${stat}${ping}ms
WS Пинг: ${discordemoji}${bot.ws.ping}ms
        
[Хостинг бота](https://hostvds.com/?affiliate_uuid=061b7539-b0f6-4d6d-8973-d603e081a737)
[Пожертвовать на хостинг](https://www.donationalerts.com/r/xaliksss)`)
            .setTimestamp())
    },
}