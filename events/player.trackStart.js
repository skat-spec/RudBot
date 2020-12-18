const {
    MessageEmbed
} = require("discord.js");
const {
    timer
} = require('../utils/functions')

module.exports = {
    name: "trackStart",
    async execute(bot, message, track) {
        return message.channel.send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle(track.title)
            .setURL(track.url)
            .setDescription(`${track.description.split(/ +/g).slice(0, 20).join(' ')}...`)
            .setFooter(`${timer(track.views, ['Просмотр', 'Просмотра', 'Просмотров'])}`)
            .setImage(track.thumbnail));
    },
};