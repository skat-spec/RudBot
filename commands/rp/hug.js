const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "hug",
    description: "Обнять пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    guildOnly: true,
    aliases: ['обнять', 'обнимаю'],
    async execute(message) {
        const data = await fetch("https://nekos.life/api/v2/img/hug").then(res => res.json());
        let user = message.mentions.users.first();

        if(message.author.id === user.id) return message.channel.send(`Вы не можете обнять себя!`)

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setAuthor(`${message.author.username} обнимает ${user.username}`)
        .setImage(`${data.url}`)
        .setTimestamp());
    }
};