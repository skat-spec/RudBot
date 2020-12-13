const {
    MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "meme",
    description: "Мем",
    usage: '',
    category: 'cmds',
    aliases: ['мем', 'mem'],
    async execute(message) {
        const data = await fetch("https://miss.perssbest.repl.co/api/v2/meme").then(res => res.json());

        message.channel.send(new MessageEmbed()
            .setFooter(message.author.username)
            .setImage(`${data.image}`)
            .setTimestamp());
    }
};