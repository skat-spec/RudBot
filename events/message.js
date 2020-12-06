const { 
    Xaliks, 
    emojiId 
} = require('../config.json')
const { 
    getServerPrefix,
    getUserRep,
    setUserRep, 
    setServerPrefix, 
    setLevelUserRep, 
    getLevelUserRep,
    getBlacklistUsers,
    error,
    timer
} = require("../utils/functions");
const bad = require('../data/bad.json')
const now = Date.now();

//Вадим не бей!) (украдено у Freedom)
const time = (time) => {
    let result = (time - Date.now());
    let seconds = Math.floor((result/1000)%60);
    let minutes = Math.floor((result/1000/60)%60);
    let hours = Math.floor((result/1000/60/60)%24);
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
        //ТБР
        if (message.content.startsWith('112') && message.guild.id === '681142809654591501' && !message.author.bot) return message.channel.send('<@&773267105243201546> <@&681200931764961306> <@&704666508869238835> <@&733340381890084925>!' + ` by ${message.author}`);
        let i = 0
        for (; i < 1000; i++) {
          if(message.guild?.id != '681142809654591501' || message.channel.id === '681532459539890205' || message.channel.id === '780340363516575784') break
            let args = message.content.toLowerCase().trim().split(/ +/);
            if(bad.includes(args[i])) message.delete({ reason: 'Анти-мат'})
        }

        //Команды
        const prefix = (await getServerPrefix(message.guild.id)) || "/";
        const serverPrefix = await getServerPrefix(message.guild.id)
        const blacklistedUsers = await getBlacklistUsers();
        const userId = message.author.id;
        const userRep = await getUserRep(message.guild.id, userId);
        const userRepLevel = await getLevelUserRep(message.guild.id, userId)
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cooldowns = bot.cooldowns;
        const commandName = args.shift().toLowerCase();
        const command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
        if (
            message.channel.type === "dm" 
            || !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")
            || !commandName
            || !command
            || !message.content.startsWith(prefix)
            || message.content === prefix
            || message.author.bot
            || userId === bot.user.id
            || (command.category === 'tbr' && message.guild.id != '681142809654591501')
        ) return;
        if (bot.commands.has(command?.name)) {
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (userRep === null || !userRep) setUserRep(message.guild.id, userId, 0);
        if (serverPrefix === null || !serverPrefix) setServerPrefix(message.guild.id, '/');
        if(userRepLevel === null || !userRepLevel) setLevelUserRep(message.guild.id, userId, 'Кто-то');
        if (message.content === `<@!${bot.user.id}>`) return message.channel.send(`Префикс на этом сервере: \`${getServerPrefix(message.guild.id)}\``);
        if (command.args && !args.length) {
            let err = 'Недостаточно аргументов!'
            if(command.usage) err += `\nПравильное использование команды: \`${prefix}${command.name} ${command.usage}\``
            return message.channel.send(error(err));
        }
        if (command.admin && message.author.id != Xaliks) {
            console.log(`${message.author.tag} пытался использовать admin команду! (${command.name})`)
            message.channel.send(error(`Эту команду может выполнять только создатель бота!`))
        return}
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime && message.author.id != '448799481777881089') {
                const timeLeft = time(expirationTime);
                return message.channel.send(error(`Пожалуйста, подожди еще \`${timeLeft}\` прежде чем использовать команду \`${command.name}\``));
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

        //ЧС
        if (blacklistedUsers !== null) {
            let isBlacklisted = blacklistedUsers.filter(u => u.user?.id === message.author.id)[0];
            if (isBlacklisted && !message.content.startsWith('/идея')) return message.react(emojiId.error)
            else if(message.content.startsWith('/идея') && isBlacklisted) {
                message.react(emojiId.error)
                message.channel.send(error('Вам запрещено писать идеи!'))
            return}
        }
    
        try {
            command.execute(message, args, bot);
        } catch (error) {
            console.error(error);
            message.channel.send('Ошибка!')
        }
    }
}
