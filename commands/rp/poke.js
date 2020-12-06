const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "poke",
    description: "Тыкнуть в пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    aliases: ['тыкнуть', 'тыкаю'],
    async execute(message) {
        const data = await fetch("https://nekos.life/api/v2/img/poke").then(res => res.json());
        let user = message.mentions.users.first(); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете тыкать в себя!`)

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setTitle(`${message.author.username} тыкает в ${user.username}`)
        .setImage(`${data.url}`)
        .setTimestamp());
    }
};