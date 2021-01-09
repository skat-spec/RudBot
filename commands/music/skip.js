const {
    error
} = require('../../utils/functions')
const {
    emojiId
} = require('../../data/emojis.json')

module.exports = {
    name: "skip",
    description: "Пропустить песню",
    aliases: ["s"],
    category: "music",
    async execute(message, args, bot) {
        const voiceChannel = message.member.voice.channel;
        const queue = await bot.player.getQueue(message);
        if(!voiceChannel) return message.channel.send(error('Вы должны быть в голосовом канале!'));
        if(!bot.player.isPlaying(message) || !queue) return message.channel.send(error('Сейчас ничего не играет либо дальше песен нет!'));

        bot.player.skip(message);
        message.react(emojiId.yes);
    },
};