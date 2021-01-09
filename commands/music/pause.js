const {
    emojiId
} = require('../../data/emojis.json')

module.exports = {
    name: "pause",
    description: "Поставить песню на паузу",
    category: "music",
    async execute(message, args, bot) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send(error('Вы должны быть в голосовом канале!'));
        if(!bot.player.isPlaying(message)) return message.channel.send(error('Сейчас ничего не играет!'));

        bot.player.pause(message);
        message.react(emojiId.yes);
    },
};