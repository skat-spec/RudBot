const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "kill",
    description: "Убить пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    guildOnly: true,
    aliases: ['убить', 'убиваю'],
    async execute(message) {
        let user = message.mentions.users.first(); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете убить себя!`)

        const data = await fetch("https://miss.perssbest.repl.co/api/v2/kill").then(res => res.json());

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setTitle(`${message.author.username} Убил ${user.username}`)
        .setImage(`${data.image}`)
        .setTimestamp());
    }
};