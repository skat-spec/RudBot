const cfg = require('../config.json')
const {
    MessageEmbed
} = require('discord.js')
const db = require("quick.db");
const strftimee = require('strftime')
let strftime = strftimee.timezone('+0300')

/**
 * @param {string} data
 * @returns {string}
 */
const formatDate = (date) => strftime('%d.%m.%Y в %H:%M:%S', date)

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
 * @param {Number} number
 * @returns {String}
 */
const time = (type) => {
    let cww = type
    let result = (cww - Date.now());
    if(result < 0) result = (cww + Date.now() - Date.now())
    let seconds = Math.floor((result / 1000) % 60);
    let minutes = Math.floor((result / 1000 / 60) % 60);
    let hours = Math.floor((result / 1000 / 60 / 60) % 24);
    let days = Math.floor((result / 1000 / 60 / 60 / 24) % 31);
    let months = Math.floor((result / 1000 / 60 / 60 / 24 / 31) % 12);
    let years = Math.floor((result / 1000 / 60 / 60 / 24 / 31 / 365) % 100);
    let text = ''
    if(years > 0) text += `${timer(years, ['год', 'года', 'лет'])} `;
    if(months > 0) text += `${timer(months, ['месяц', 'мсесяца', 'месяцев'])} `;
    if(days > 0) text += `${timer(days, ['день', 'дня', 'дней'])} `;
    if(hours > 0) text += `${timer(hours, ['час', 'часа', 'часов'])} `;
    if(minutes > 0) text += `${timer(minutes, ['минута', 'минуты', 'минут'])} `;
    if(seconds > 0) text += `${timer(seconds, ['секунда', 'секунды', 'секунд'])}`;
    if(result < 1000) text = `${timer(result, ['миллисекунда', 'миллисекунды', 'миллисекунд'])}`;
    return text
}

/**
 * @param {string} guildId
 */
const getServerPrefix = (guildId) =>
    db.fetch(`prefix_${guildId}`);

/**
 * @param {string} guildId
 * @param {string} newPrefix
 */
const setServerPrefix = (guildId, newPrefix) => db.set(`prefix_${guildId}`, newPrefix);

// Blacklist
/**
 * @param {Object} user
 */
const addBlacklistUser = (user) => db.push("blacklist", user);

const getBlacklistUsers = () => db.fetch("blacklist");

/**
 * @param {Array} users
 */
const setBlacklistUsers = (users) => db.set("blacklist", users);


// rep
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
 * @param {string} errorEmbed
 * @returns {string}
 */
let error = (errorEmbed) => new MessageEmbed()
    .setTitle(`${cfg.emoji.error} Ошибка!`)
    .setDescription(errorEmbed)
    .setColor('FF0000')
    .setTimestamp()

/**
 * @param {string} yesEmbed
 * @returns {string}
 */
let yes = (yesEmbed) => new MessageEmbed()
    .setTitle(`${cfg.emoji.yes} Успешно!`)
    .setDescription(yesEmbed)
    .setColor('00FF00')
    .setTimestamp()

module.exports = {
    formatDate,
    error,
    yes,
    getServerPrefix,
    setServerPrefix,
    addBlacklistUser,
    getBlacklistUsers,
    setBlacklistUsers,
    setUserRep,
    addUserRep,
    getUserRep,
    remUserRep,
    timer,
    time
};