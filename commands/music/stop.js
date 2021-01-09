const {
    error
} = require('../../utils/functions')
const {
    emojiId
} = require('../../data/emojis.json')

module.exports = {
    name: "stop",
    description: "Остановить песню",
    category: "music",
    async execute(message, args, bot) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send(error('Вы должны быть в голосовом канале!'));
        if(!bot.player.isPlaying(message)) return message.channel.send(error('Сейчас ничего не играет!'));

        bot.player.stop(message);
        message.react(emojiId.yes);
    },
};