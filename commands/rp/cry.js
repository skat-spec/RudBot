const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "cry",
    description: "Заплакать",
    guildOnly: true,
    usage: '',
    category: 'rp',
    aliases: ['плакать', 'плачу'],
    async execute(message) {
        const data = await fetch("https://miss.perssbest.repl.co/api/v2/cry").then(res => res.json());

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setAuthor(`${message.author.username} Плачет`)
        .setImage(`${data.image}`)
        .setTimestamp());
    }
};