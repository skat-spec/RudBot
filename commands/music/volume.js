const {
    error
} = require('../../utils/functions')

module.exports = {
    name: "volume",
    description: "Поставить громкость от 1 до 100",
    category: "music",
    args: true,
    usage: '<Громкость от 1 до 100>',
    aliases: ["vol"],
    async execute(message, args, bot) {
        const voiceChannel = message.member.voice.channel;
        const volume = args[0]
        if(!voiceChannel) return message.channel.send(error('Вы должны быть в голосовом канале!'));
        if(!bot.player.isPlaying(message)) return message.channel.send(error('Сейчас ничего не играет!'));
        if(Number(volume) < 0) return message.channel.send(error('Громкость должна быть больше 0%!'));
        if(Number(volume) > 100) return message.channel.send(error('Громкость должны быть меньше 100%!'));

        bot.player.setVolume(message, volume);
        await message.channel.send(`Громкость поставлена на ${volume}%`);
    },
};