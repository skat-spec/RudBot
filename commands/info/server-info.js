const {
    MessageEmbed
} = require('discord.js');
const {
    formatDate,
    timer,
    time
} = require("../../utils/functions");
const {
    regions,
    verification,
    features
} = require('../../data/server-info')
const {
    emoji,
    Xaliks
} = require('../../config.json')
const ms = require('ms')

module.exports = {
    name: 'server-info',
    description: 'Инфо о сервере',
    aliases: ['server', 'si'],
    category: 'info',
    guildOnly: true,
    async execute(message, args, bot) {
        let argsUser = message.author

        let emojis;
        if(message.guild.emojis.cache.size === 0) emojis = 'Отсутствуют';
        else emojis = message.guild.emojis.cache.size;
        let roles;
        if(message.guild.roles.cache.size === 0) roles = 'Отсутствуют';
        else roles = message.guild.roles.cache.size;
        let gchannels;
        if(message.guild.channels.cache.filter(c => c.type === 'voice').size === 0) gchannels = 'Отсутствуют'
        else gchannels = message.guild.channels.cache.filter(c => c.type === 'voice').size;
        let categories
        if(message.guild.channels.cache.filter(c => c.type === 'category').size === 0) categories = 'Отсутствуют';
        else categories = message.guild.channels.cache.filter(c => c.type === 'category').size;
        let afk;
        if(message.guild.afkChannel === null) afk = '**Отсутствует**';
        else afk = `**${message.guild.afkChannel.name}** | **${time(message.guild.afkTimeout * 100)}**`;



        var online = message.guild.presences.cache.filter(m => m.status == 'online').size
        var offline = message.guild.members.cache.filter(m => m.presence.status == 'offline').size
        var idle = message.guild.presences.cache.filter(m => m.status == 'idle').size
        var dnd = message.guild.presences.cache.filter(m => m.status == 'dnd').size

        let date1 = new Date(message.createdTimestamp)
        let date2 = new Date(message.guild.createdTimestamp)
        let date3 = new Date(message.guild.member(argsUser).joinedTimestamp)
        let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime())))
        let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime())))

        let msg = await message.channel.send('Поиск информации...')

        let embed = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({
                dynamic: true
            }))
            .setTitle(`Информация о сервере`)
            .setDescription(`ID: **${message.guild.id}**
Регион: **${regions[message.guild.region]}**
Владелец: **${message.guild.owner}**
Уровень верификации: **${verification[message.guild.verificationLevel]}**

:grinning: Кол-во эмодзи: **${emojis}**
🎭 Кол-во ролей: **${roles}**

Участников **${message.guild.memberCount}**
:bust_in_silhouette: Пользователей: **${message.guild.members.cache.filter(m => !m.user.bot).size}**
Ботов: **${message.guild.members.cache.filter(m => m.user.bot).size}**
${emoji.online} Онлайн: **${online}**
${emoji.offline} Оффлайн: **${offline}**
${emoji.idle} Не актив: **${idle}**
${emoji.dnd} Не беспокоить: **${dnd}**

:books: Кол-во категорий: **${categories}**
:page_facing_up: Кол-во текст. каналов **${message.guild.channels.cache.filter(c => c.type === 'text').size}**
Кол-во гол. каналов: **${gchannels}**
AFK канал | Тайм-аут: ${afk}

Дата создания: **${formatDate(new Date(message.guild.createdTimestamp))}**\n(**${timer(parseInt(ms(diff1).match(/\d+/)), ['день', 'дня', 'дней'])} назад**)
Вы присоединились: **${formatDate(new Date(message.guild.member(argsUser).joinedTimestamp))}**\n(**${timer(parseInt(ms(diff2).match(/\d+/)), ['день', 'дня', 'дней'])} назад**)`)
            .setTimestamp()
            .setColor("303136")
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
        if(message.guild.premiumSubscriptionCount > 0) {
            embed.addField(`Буст`, `Уровень буста: **${message.guild.premiumTier}**\nКол-во бустов: **${message.guild.premiumSubscriptionCount}**`, true)
        }

        if(message.guild.features[0]) {
            let feat = ' '
            let i = 0;
            do {
                feat += features[message.guild.features[i]] + '\n'
                i++;
                if(!message.guild.features[i]) break
            } while(i < 15);
            embed.addField(`Особенности:`, feat + '\nЕсли вместо особенности "undefined", то пишите в лс ' + bot.users.cache.get(Xaliks).tag, true)
        }
        msg.edit('', embed)
    }
}