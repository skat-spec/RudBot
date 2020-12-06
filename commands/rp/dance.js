const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "dance",
    description: "Танцевать",
    usage: '',
    guildOnly: true,
    category: 'rp',
    aliases: ['танцевать', 'танцую'],
    async execute(message) {
        const data = await fetch("https://miss.perssbest.repl.co/api/v2/dance").then(res => res.json());

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setAuthor(`${message.author.username} Танцует`)
        .setImage(`${data.image}`)
        .setTimestamp());
    }
};