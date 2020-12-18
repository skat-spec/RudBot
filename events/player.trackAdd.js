const {
    MessageEmbed
} = require('discord.js')
const {
    timer
} = require('../utils/functions')

module.exports = {
    name: "trackAdd",
    async execute(bot, message, queue, track) {
        return message.channel.send(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setURL(track.url)
            .setTitle('Песня ' + track.title + ' Добавлена в очередь')
            .setDescription(`${track.description.split(/ +/g).slice(0, 20).join(' ')}...`)
            .setFooter(`${timer(track.views, ['Просмотр', 'Просмотра', 'Просмотров'])}`)
            .setImage(track.thumbnail));
    },
};