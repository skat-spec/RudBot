const {
    prefix,
    Xaliks
} = require('../config.json')
const {
    error,
    timer
} = require("../utils/functions");
const now = Date.now();

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
        
        //Команды
        const userId = message.author.id;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cooldowns = bot.cooldowns;
        const commandName = args.shift().toLowerCase();
        const command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
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
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;
            if(command.args && !args.length) return message.channel.send(error(command.usage ? `Правильное использование команды: \`${prefix}${command.name} ${command.usage}\`` : '').setTitle('Недостаточно аргументов!'));
            if(command.admin && message.author.id != Xaliks) return message.channel.send(error(`Эту команду может выполнять только создатель бота!`))
            if(timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if(now < expirationTime && message.author.id != Xaliks) {
                    const timeLeft = time(expirationTime);
                    return message.channel.send(error(`Пожалуйста, подожди еще \`${timeLeft}\` прежде чем использовать команду \`${command.name}\``));
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        
        try {
            command.execute(message, args, bot);
        } catch (error) {
            message.channel.send('Ошибка! Обратитесь к создателю бота.')
        }
    }
}
