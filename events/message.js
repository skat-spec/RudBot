const cfg = require('../config.json')
const {
    emojiId
} = require('../data/emojis.json')
const {
    getUserRep,
    setUserRep,
    getServerPrefix,
    setServerPrefix,
    getBlacklistUsers,
    error,
    timer
} = require("../utils/functions");
const now = Date.now();
const {
    MessageEmbed
} = require('discord.js')
const db = require('quick.db')

const time = (time) => {
    let result = (time - now);
    let seconds = Math.floor((result / 1000) % 60);
    let minutes = Math.floor((result / 1000 / 60) % 60);
    let hours = Math.floor((result / 1000 / 60 / 60) % 24);
    let text = ''
    if(hours > 0) text += `${timer(hours, ['час', 'часа', 'часов'])} `;
    if(minutes > 0) text += `${timer(minutes, ['минуту', 'минуты', 'минут'])} `;
    if(seconds > 0) text += `${timer(seconds, ['секунду', 'секунды', 'секунд'])}`;
    if(result < 1000) text = `${timer(result, ['миллисекунду', 'миллисекунды', 'миллисекунд'])}`;
    return text
}

module.exports = {
    name: "message",
    async execute(bot, message) {
        if(!message.guild) return;
        if(db.fetch('messages') && db.fetch('messages') != null) {
            db.add('messages', 1)
        } else {
            db.set('messages', 1)
        }
        
        //Команды
        const prefix = (await getServerPrefix(message.guild.id)) || cfg.prefix;
        const blacklistedUsers = await getBlacklistUsers();
        const userId = message.author.id;
        const userRep = await getUserRep(message.guild.id, userId);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cooldowns = bot.cooldowns;
        const commandName = args.shift().toLowerCase();
        const command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
        if(getServerPrefix(message.guild.id) === null || getServerPrefix(message.guild.id) === '') setServerPrefix(message.guild.id, cfg.prefix)
        if(
            !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES") ||
            !commandName ||
            !command ||
            !message.content.startsWith(prefix) ||
            message.content === prefix ||
            message.author.bot ||
            userId === bot.user.id
        ) return;
        if(bot.commands.has(command?.name)) {
            if(command.category === "TBR" && message.guild.id != '681142809654591501') return;
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;
            if(userRep === null || !userRep) setUserRep(message.guild.id, userId, 0);
            if(command.args && !args.length) return message.channel.send(error(command.usage ? `Правильное использование команды: \`${prefix}${command.name} ${command.usage}\`` : '').setTitle('Недостаточно аргументов!'));
            if(command.admin && message.author.id != cfg.Xaliks) return message.channel.send(error(`Эту команду может выполнять только создатель бота!`))
            if(timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if(now < expirationTime && message.author.id != cfg.Xaliks) {
                    const timeLeft = time(expirationTime);
                    return message.channel.send(error(`Пожалуйста, подожди еще \`${timeLeft}\` прежде чем использовать команду \`${command.name}\``));
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            
            if(db.fetch('commands') && db.fetch('commands') != null) {
                db.add('commands', 1)
            } else {
                db.set('commands', 1)
            }
        }
        
        //ЧС
        let isBlacklisted = blacklistedUsers.filter(u => u.user?.id === message.author.id)[0];
        if(blacklistedUsers !== null && isBlacklisted) return message.react(emojiId.error)
        
        try {
            command.execute(message, args, bot);
        } catch (error) {
            message.channel.send('Ошибка! Обратитесь к создателю бота.')
        }
    }
}
