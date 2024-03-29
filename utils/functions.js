const {
    errorLogsChannelId,
    Xaliks
} = require('../config.json')
const {
    emoji
} = require('../data/emojis.json')
const {
    MessageEmbed
} = require('discord.js')
const db = require("quick.db");
const strftime = require('strftime').timezone('+0300')

// Префиксы
/**
 * @param {String} guildId
 * @returns {String} 
 */
const getServerPrefix = (guildId) =>
    db.fetch(`prefix_${guildId}`);

/**
 * @param {String} guildId
 * @param {String} newPrefix
 */
const setServerPrefix = (guildId, newPrefix) => db.set(`prefix_${guildId}`, newPrefix);

// ЧС
/**
 * @param {Object} user
 */
const addBlacklistUser = (user) => db.push("blacklist", user);

/**
 * @returns {Array}
 */
const getBlacklistUsers = () => db.fetch("blacklist");

/**
 * @param {Array} users
 */
const setBlacklistUsers = (users) => db.set("blacklist", users);


// Репутация
/**
 * @param {String} guildId
 * @param {String} userId
 * @param {Number} amount
 */
const setUserRep = (guildId, userId, amount) =>
    db.set(`rep_${guildId}_${userId}`, amount);

/**
 * @param {String} guildId
 * @param {String} userId
 * @param {Number} amount
 */
const addUserRep = (guildId, userId, amount) =>
    db.add(`rep_${guildId}_${userId}`, amount);

/**
 * @param {String} guildId 
 * @param {String} userId 
 * @returns {Number}
 */
const getUserRep = (guildId, userId) =>
    db.fetch(`rep_${guildId}_${userId}`);

/**
 * @param {String} guildId 
 * @param {String} userId 
 * @param {Number} amount 
 */
const remUserRep = (guildId, userId, amount) =>
    db.subtract(`rep_${guildId}_${userId}`, amount);

/**
 * @param {String} guildId 
 */
const resServerRep = (guildId) => {
    let GuildRep = db
        .fetchAll()
        .filter((da) => da.ID.startsWith(`rep_${guildId}`))

    let i = 0
    for(; i < GuildRep.length; i++) {
        let UID = GuildRep[i].ID.replace(`rep_${guildId}_`, "");
        remUserRep(guildId, UID, GuildRep[i].data)
    }
}


//Свадьбы
/**
 * @param {String} guildId 
 * @param {String} userId 
 * @param {String} authorId 
 */
const setMarry = (guildId, userId, authorId) =>
    db.set(`marry_${guildId}_${userId}`, authorId)
/**
 * @param {String} guildId 
 * @param {String} userId 
 */
const delMarry = (guildId, userId) =>
    db.delete(`marry_${guildId}_${userId}`)
/**
 * @param {String} guildId
 * @param {String} userId
 * @returns {String}
 */
const getMarry = (guildId, userId) =>
    db.fetch(`marry_${guildId}_${userId}`)

//Идеи
/**
 * @param {String} guildId
 * @param {String} ChannelId 
 */
const setIdeaChannel = (guildId, ChannelId) =>
    db.set(`idea_${guildId}`, ChannelId)

/**
 * @param {String} guildId
 * @returns {String}
 */
const getIdeaChannel = (guildId) =>
    db.fetch(`idea_${guildId}`)

/**
 * @param {String} guildId
 */
const delIdeaChannel = (guildId) =>
    db.delete(`idea_${guildId}`)


//Остальное
/**
 * @param {String} data
 * @returns {String}
 */
const formatDate = (date) => strftime('%d.%m.%Y в %H:%M:%S', date)


//Спс Вадим
/**
 * @param {Number} number
 * @param {String} titles
 * @returns {String}
 */
const timer = (number, titles) => {
    number1 = number
    number = Math.abs(number)
    let cases = [2, 0, 1, 1, 1, 2];
    return `${number1} ${titles[(number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5]]}`;
}

/**
 * 
 * @param {Array} arr 
 * @param {String} conj 
 * @returns {String}
 */
const list = (arr, conj = 'и') => {
    const {
        length
    } = arr;
    if(length === 0) return '';
    if(length === 1) return arr[0];
    return arr.slice(0, -1).join(', ') + ` ${conj} ` + arr.slice(-1);
}

//Спс Вадим
/**
 * @param {Number} number
 * @returns {String}
 */
const time = (number) => {
    let result = (number - Date.now());
    if(result < 0) result = (number + Date.now() - Date.now());
    let seconds = Math.floor((result / 1000) % 60);
    let minutes = Math.floor((result / 1000 / 60) % 60);
    let hours = Math.floor((result / 1000 / 60 / 60) % 24);
    let days = Math.floor((result / 1000 / 60 / 60 / 24) % 31);
    let months = Math.floor((result / 1000 / 60 / 60 / 24 / 31) % 12);
    let years = Math.floor((result / 1000 / 60 / 60 / 24 / 31 / 365) % 100);
    let text = []
    if(years > 0) text.push(timer(years, ['год', 'года', 'лет']));
    if(months > 0) text.push(timer(months, ['месяц', 'мсесяца', 'месяцев']));
    if(days > 0) text.push(timer(days, ['день', 'дня', 'дней']));
    if(hours > 0) text.push(timer(hours, ['час', 'часа', 'часов']));
    if(minutes > 0) text.push(timer(minutes, ['минута', 'минуты', 'минут']));
    if(seconds > 0) text.push(timer(seconds, ['секунда', 'секунды', 'секунд']));
    if(result < 1000) text = [timer(result, ['миллисекунда', 'миллисекунды', 'миллисекунд'])];
    return list(text)
}


/**
 * @param {import("discord.js").Client} bot Бот
 * @returns {import {"discord.js"}.MessageEmbed} Embed
 */
const sendErrorLog = (bot, error) => {
    const channel = bot.channels.cache.get(errorLogsChannelId);
    if(!channel || !errorLogsChannelId) return;

    const name = error.name || 'Отстутствует';
    const code = error.code || 'Отстутствует';
    const httpStatus = error.httpStatus || 'Отстутствует';
    const path = error.path || 'Отстутствует';
    const stack = error.stack || error;

    channel.send(`<@${Xaliks}>`, new MessageEmbed()
        .setTitle('Новая ошибка!')
        .addField('**Короткая ошибка:**', `\`${error}\``, true)
        .addField('**Имя:**', `\`${name}\``, true)
        .addField('**Код ошибки:**', `\`${code}\``, true)
        .addField('**Патч:**', `\`${path}\``, true)
        .addField('**http Статус:**', `\`${httpStatus}\``, true)
        .setDescription(`**Ошибка:**\n\`\`\`${stack}\`\`\``));
}

/**
 * @param {String} description Описание ошибки
 * @returns {import("discord.js").MessageEmbed} Embed "Ошибка"
 */
const error = (description) => new MessageEmbed()
    .setTitle(`${emoji.error} Ошибка!`)
    .setDescription(description)
    .setColor('FF0000')
    .setTimestamp()

/**
 * @param {String} description Описание "Успешно"
 * @returns {import("discord.js").MessageEmbed} Embed "Успешно"
 */
const yes = (description) => new MessageEmbed()
    .setTitle(`${emoji.yes} Успешно!`)
    .setDescription(description)
    .setColor('00FF00')
    .setTimestamp()

/**
 * @param {import("discord.js").Message} message Сообщение
 * @param {String} user Пользователь
 * @param {Boolean} yes Упоминать ли автора?
 * @returns {Object}
 */
const findMember = (message, user, yes) => {
    let e;
    if(user === '' && yes) e = message.member
    else if(!user && yes) e = message.member
    else e = message.guild.member(
        message.mentions.users.first() ||
        message.guild.members.cache.get(user) ||
        message.guild.members.cache.find((m) => m.user.id === user) ||
        message.guild.members.cache.find((m) => m.user.tag.toLowerCase() === user.toLocaleLowerCase()) ||
        message.guild.members.cache.find(m => m.user.username.toLowerCase() === user.toLocaleLowerCase()) ||
        message.guild.members.cache.find(m => m.displayName.toLowerCase() === user.toLocaleLowerCase()) ||
        message.guild.members.cache.find(m => m.user.username.toLowerCase().startsWith(user.toLocaleLowerCase())) ||
        message.guild.members.cache.find(m => m.displayName.toLowerCase().startsWith(user.toLocaleLowerCase()))
    )
    if(!e) return message.channel.send(error('Пользователь не найден!'))
    return e
}

module.exports = {
    formatDate,
    findMember,
    error,
    yes,
    addBlacklistUser,
    getBlacklistUsers,
    setBlacklistUsers,
    getServerPrefix,
    setServerPrefix,
    setIdeaChannel,
    getIdeaChannel,
    delIdeaChannel,
    setUserRep,
    addUserRep,
    getUserRep,
    remUserRep,
    resServerRep,
    setMarry,
    delMarry,
    getMarry,
    sendErrorLog,
    timer,
    time,
    list
};