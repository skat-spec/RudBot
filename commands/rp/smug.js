const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "smug",
    description: "Выглядеть самодовольно.",
    category: 'rp',
    async execute(message) {
        const data = await fetch("https://nekos.life/api/v2/img/smug").then(res => res.json());

        message.channel.send(new MessageEmbed()
        .setDescription(`${message.author} Выглядит самодовольно.`)
        .setImage(data.url)
        .setTimestamp());
    },
};