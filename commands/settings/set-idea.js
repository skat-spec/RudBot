const {
    setServerIdeaChannel,
    error,
    yes
} = require('../../utils/functions')
const {
    Xaliks
} = require('../../config.json')

module.exports = {
    name: "set-idea",
    description: "Поставить канал для идей",
    category: 'settings',
    args: true,
    usage: "<#Канал для идей>",
    async execute(message, args, bot) {
        const channel =
          message.mentions.channels.first() ||
          message.guild.channels.cache.find((ch) => ch.name === args[0]) ||
          message.guild.channels.cache.find((ch) => ch.id === args[0]);
        if(!channel) return message.channel.send(error('Канал не найден!'))
        if(
            message.author.id != Xaliks &&
            !message.member.permissions.has(["MANAGE_GUILD"] &&
            !message.member.permissions.has(["ADMINISTRATOR"]))) return message.channel.send(error('У вас нет прав! (**Управлять сервером**)'))
        else {
            setServerIdeaChannel(message.guild.id, channel.id)
            message.channel.send(yes(`Канал установлен! (${channel})`))
        }
    }
};
