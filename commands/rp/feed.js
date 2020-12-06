const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "feed",
    description: "Накормить пользователя",
    args: true,
    usage: '<@Пользователь>',
    guildOnly: true,
    category: 'rp',
    aliases: ['кормить', 'покормить', 'кормлю'],
    async execute(message) {
        const data = await fetch("https://nekos.life/api/v2/img/feed").then(res => res.json());
        let user = message.mentions.users.first(); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете покормить себя!`)

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setAuthor(`${message.author.username} кормит ${user.username}`)
        .setImage(`${data.url}`)
        .setTimestamp());
    }
};