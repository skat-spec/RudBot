const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "pat",
    description: "Погладить пользователя",
    args: true,
    usage: '<@Пользователь>',
    guildOnly: true,
    category: 'rp',
    aliases: ['гладить', 'погладить', 'глажу'],
    async execute(message) {
        const data = await fetch("https://nekos.life/api/v2/img/pat").then(res => res.json());
        let user = message.mentions.users.first(); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете погладить себя!`)

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setTitle(`${message.author.username} гладит ${user.username}`)
        .setImage(`${data.url}`)
        .setTimestamp());
    }
};