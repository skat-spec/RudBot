const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "slap",
    description: "Дать пощечины пользователю.",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    guildOnly: true,
    aliases: [''],
    async execute(message) {
        const data = await fetch("https://nekos.life/api/v2/img/slap").then(res => res.json());
        let user = message.mentions.users.first(); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете дать себе пощечину!`)

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setTitle(`${message.author.username} даёт пощечину ${user.username}`)
        .setImage(`${data.url}`)
        .setTimestamp());
    }
};