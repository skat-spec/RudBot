const {
    MessageEmbed
} = require('discord.js');
const {
    timer
} = require('../../utils/functions')

module.exports = {
    name: "nowplaying",
    description: "Какая песня сейчас играет",
    category: "music",
    aliases: ["np", "currentsong"],
    async execute(message, args, bot) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send(error('Вы должны быть в голосовом канале!'));

        const playing = bot.player.isPlaying(message);
        if(!bot.player.isPlaying(message)) return message.channel.send(error('Сейчас ничего не играет!'));

        const song = bot.player.nowPlaying(message);

        message.channel.send(new MessageEmbed()
            .setTitle(song.title)
            .setURL(song.url)
            .setAuthor(`🎵 ${playing ? 'Играет' : 'Поставлена на паузу'}`)
            .setImage(song.thumbnail)
            .setDescription(`${song.description.split(/ +/g).slice(0, 20).join(' ')}...`)
            .setFooter(`${timer(song.views, ['Просмотр', 'Просмотра', 'Просмотров'])}`));
    },
};