const {
    MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");
const {
    error
} = require('../../utils/functions')

module.exports = {
    name: "minecraft",
    description: "Инфо о minecraft сервере",
    args: true,
    usage: '<IP сервера>',
    category: 'info',
    aliases: ['майнкрафт', 'мсервер'],
    async execute(message, args) {
        const data = await fetch(`https://api.mcsrvstat.us/2/${args}`).then(res => res.json());
        if(data.ip === "") return message.channel.send(error('IP не найден!'))

        message.channel.send(new MessageEmbed()
            .setFooter(message.author.username)
            .setTitle(`Информация о minecraft сервере`)
            .setDescription(`Онлайн? **${data.online ? 'ДА' : 'НЕТ'}**

**IP:** **${data.ip} ${data.hostname ? `/ ${data.hostname}`: ''}**
**Порт:** **${data.port}**
${data.online ? `**Игроков:** **${data.players.online} / ${data.players.max}**
**Версия:** **${data.version}**

${data.motd.clean ? `**Описание:**
\`${data.motd.clean}\`` : ''}` : ''}`)
            .setThumbnail(`https://api.mcsrvstat.us/icon/${args}`)
            .setTimestamp());
    }
};