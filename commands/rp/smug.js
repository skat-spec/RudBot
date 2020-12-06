const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "smug",
    description: "Выглядеть самодовольно.",
    usage: '',
    category: 'rp',
    guildOnly: true,
    aliases: [''],
    async execute(message) {
        const data = await fetch("https://nekos.life/api/v2/img/smug").then(res => res.json());

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setTitle(`${message.author.username} Выглядит самодовольно.`)
        .setImage(`${data.url}`)
        .setTimestamp());
    }
};