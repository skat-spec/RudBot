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
    emoji
} = require('../../data/emojis.json')

module.exports = {
    name: 'server-info',
    description: 'Инфо о сервере',
    aliases: ['server', 'si'],
    category: 'info',
    async execute(message) {
        const msg = await message.channel.send('Поиск информации...')

        //Кол-во
        //------------------------------------------------------------------------------------------------
        let emojis;
        if(message.guild.emojis.cache.size === 0) emojis = 'Отсутствуют';
        else emojis = message.guild.emojis.cache.size;
        let roles;
        if(message.guild.roles.cache.size === 0) roles = 'Отсутствуют';
        else roles = message.guild.roles.cache.size;
        let afk;
        if(message.guild.afkChannel === null) afk = '**Отсутствует**';
        else afk = `**${message.guild.afkChannel.name}** | **${time(message.guild.afkTimeout * 100)}**`;
        //------------------------------------------------------------------------------------------------

        //Даты
        //------------------------------------------------------------------------------------------------
        let date1 = new Date(message.createdTimestamp)
        let date2 = new Date(message.guild.createdTimestamp)
        let date3 = new Date(message.guild.member(message.author).joinedTimestamp)
        const createdAtMS = Math.round(Math.abs((date1.getTime() - date2.getTime())))
        const joinedAtMS = Math.round(Math.abs((date1.getTime() - date3.getTime())))
        const joinedAt = formatDate(date3)
        const createdAt = formatDate(date2)
        //------------------------------------------------------------------------------------------------

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle(`Информация о сервере`)
            .setDescription(`ID: **${message.guild.id}**
Регион: **${regions[message.guild.region]}**
Владелец: **${message.guild.owner}**
Уровень верификации: **${verification[message.guild.verificationLevel]}**
AFK канал | Тайм-аут: ${afk}`)

            //Участники
            //------------------------------------------------------------------------------------------------
            .addField(`Участников (${message.guild.memberCount})`, `:bust_in_silhouette: Пользователей: **${message.guild.members.cache.filter(m => !m.user.bot).size}**
${emoji.bot} Ботов: **${message.guild.members.cache.filter(m => m.user.bot).size}**
${emoji.online} Онлайн: **${getStatuses('online')}**
${emoji.offline} Оффлайн: **${getStatuses('offline')}**
${emoji.idle} Не актив: **${getStatuses('idle')}**
${emoji.dnd} Не беспокоить: **${getStatuses('dnd')}**`, true)
            //------------------------------------------------------------------------------------------------

            //Количество
            //------------------------------------------------------------------------------------------------
            .addField('Количество', `:grinning: Кол-во эмодзи: **${emojis}**
🎭 Кол-во ролей: **${roles}**
:books: Кол-во категорий: **${typeChannels('category')}**
:page_facing_up: Кол-во текст. каналов **${typeChannels('text')}**
${emoji.voice} Кол-во гол. каналов: **${typeChannels('voice')}**`, true)
            .addField(`⁣⁣⁣⁣`, `⁣`, true)
            //------------------------------------------------------------------------------------------------

            .setTimestamp()
            .setFooter('Дизайн JeggyBot')
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))

        //Если есть бусты
        //------------------------------------------------------------------------------------------------
        if(message.guild.premiumSubscriptionCount > 0) embed.addField(`Буст`, `${emoji.boost} Уровень буста: **${message.guild.premiumTier}**
${emoji.boosted} Кол-во бустов: **${message.guild.premiumSubscriptionCount}**`, true)
        //------------------------------------------------------------------------------------------------

        //Если есть особенности
        //------------------------------------------------------------------------------------------------
        if(message.guild.features[0]) {
            let feat = '';
            message.guild.features.forEach((FEAT) => {
                feat += features[FEAT] + '\n'
            })
            embed.addField(`Особенности:`, feat, true)
        }
        //------------------------------------------------------------------------------------------------

        //Даты
        //------------------------------------------------------------------------------------------------
        embed.addField(`⁣⁣⁣⁣`, `⁣`, false)
        embed.addField(`Дата создания: **${createdAt}**`, `(**${getDay(createdAtMS)} назад**)`, true)
        embed.addField(`Вы присоединились: **${joinedAt}**`, `(**${getDay(joinedAtMS)} назад**)`, true)
        //------------------------------------------------------------------------------------------------

        msg.edit('', embed)

        function getStatuses(statusType) {
            return message.guild.presences.cache.filter(m => m.status == statusType).size
        }

        function typeChannels(channelType) {
            let mreturn;
            if(message.guild.channels.cache.filter(c => c.type === channelType).size === 0) mreturn = 'Отсутствуют'
            else mreturn = message.guild.channels.cache.filter(c => c.type === channelType).size;
            return mreturn
        }
    }
}

function getDay(ms) {
    let day = 1000 * 60 * 60 * 24
    let message = '0 дней'
    if(ms >= day) message = timer(Math.round(ms / (1000 * 60 * 60 * 24)), ['день', 'дня', 'дней'])
    return message
}