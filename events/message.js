let {
    prefix,
    Xaliks
} = require('../config.json')
const {
    emojiId
} = require('../data/emojis.json')
const {
    getUserRep,
    setUserRep,
    getBlacklistUsers,
    error,
    timer
} = require("../utils/functions");
const bad = require('../data/bad.json')
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
        message.guild.prefix = message.guild.prefix || prefix
        message.guild.ideaChannel = message.guild.ideaChannel || undefined;

        //ТБР
        if(message.content.startsWith('112') && message.guild.id === '681142809654591501' && !message.author.bot) return message.channel.send('<@&773267105243201546> <@&681200931764961306> <@&704666508869238835> <@&733340381890084925>!' + ` by ${message.author}`);
        let i = 0
        for(; i < 1000; i++) {
            if(message.guild?.id != '681142809654591501' || message.channel.id === '681532459539890205' || message.channel.id === '780340363516575784') break
            let args = message.content.toLowerCase().trim().split(/ +/);
            if(bad.includes(args[i])) message.delete({
                reason: 'Анти-мат'
            })
        }
        db.add('messages', 1)
        
        //Команды
        prefix = message.guild.prefix
        const blacklistedUsers = await getBlacklistUsers();
        const userId = message.author.id;
        const userRep = await getUserRep(message.guild.id, userId);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cooldowns = bot.cooldowns;
        const commandName = args.shift().toLowerCase();
        const command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
        if(message.content === `<@!${bot.user.id}>`) return message.channel.send(`Префикс на этом сервере: \`${prefix}\``);
        if(
            message.channel.type === "dm" ||
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
            if(userRep === null || !userRep) setUserRep(message.guild.id, userId, 0);
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
            
            db.add('commands', 1)
            
            const w = await bot.guilds.cache.get('717450963442466886').fetchWebhooks();
            const webhook = w.find((w) => w.name === 'Using');
            if(!webhook) return;
            webhook.send(new MessageEmbed()
                .setTitle('Новая команда')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(message.content)
                .setFooter(`С сервера ${message.guild.name} (${message.guild.id})`)
                .setTimestamp())
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
