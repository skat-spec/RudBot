const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "tickle",
    description: "Пощекотать пользователя.",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    guildOnly: true,
    aliases: ['пощекотать', 'щекотать'],
    async execute(message) {
        const data = await fetch("https://nekos.life/api/v2/img/tickle").then(res => res.json());
        let user = message.mentions.users.first(); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете пощекотать себя!`)

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setColor("BLUE")
        .setTitle(`${message.author.username} щекочет ${user.username}`)
        .setImage(`${data.url}`)
        .setTimestamp());
    }
};