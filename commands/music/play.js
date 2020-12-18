const {
    error
} = require('../../utils/functions')

module.exports = {
    name: "play",
    description: "Играть песню",
    aliases: ["p"],
    category: "music",
    args: true,
    usage: "<YouTube ссылка | название песни>",
    async execute(message, args, bot) {
        const voiceChannel = message.member.voice.channel;
        const search = args.join(" ");
        if(!voiceChannel) return message.channel.send(error('Вы должны быть в голосовом канале!'));
        const perms = voiceChannel.permissionsFor(bot.user);
        if(!perms.has("CONNECT") || !perms.has("SPEAK")) return message.channel.send(error('У меня нет прав! (**Подключаться | говорить**)'));

        bot.player.play(message, search);
    },
};