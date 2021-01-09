const {
    MessageEmbed
} = require('discord.js')
const {
    formatDate,
    timer,
    findMember
} = require("../../utils/functions");
const {
    emoji
} = require('../../data/emojis.json')
const {
    badges,
    ActivityType
} = require('../../data/user-info')

module.exports = {
    name: 'user-info',
    description: 'Инфо о пользователе',
    aliases: ['u', 'ui', 'user'],
    cooldown: 10,
    usage: '[@Пользователь/ID]',
    category: 'info',
    async execute(message, args, bot) {
        const member = findMember(message, args.join(' '), true)

        //Статус
        const clientStatus = [];
        if(member.presence.status === 'offline') clientStatus.push(`${emoji.offline} Оффлайн`)
        else {
            if(member.presence.clientStatus.web) clientStatus.push(`${emoji[member.presence.clientStatus.web]} Сайт`);
            if(member.presence.clientStatus.mobile) clientStatus.push(`${emoji[member.presence.clientStatus.mobile]} Телефон`);
            if(member.presence.clientStatus.desktop) clientStatus.push(`${emoji[member.presence.clientStatus.desktop]} Компьютер`);
        }

        //Создан / Зашел
        let date1 = new Date(message.createdTimestamp)
        let date2 = new Date(member.user.createdTimestamp)
        let date3 = new Date(message.guild.member(member).joinedTimestamp)
        const createdAtMS = Math.round(Math.abs((date1.getTime() - date2.getTime())))
        const joinedAtMS = Math.round(Math.abs((date1.getTime() - date3.getTime())))
        const joinedAt = formatDate(date3)
        const createdAt = formatDate(date2)

        //Роли
        const roles =
            member.roles.cache
            .filter((r) => r !== message.guild.id)
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1)
            .join(", ") || "**Остсутствуют**"

        const RolesCount = member.roles.cache.size - 1

        //Статус
        let status = '';
        let activity = '';
        let act = member.user.presence.activities;
        if(member.user.presence.status != 'offline' && act[0]) {
            if(act[0].type === 'CUSTOM_STATUS') status = act[0].state === null ? '' : act[0].state;
            else status = ActivityType[act[0].type] + `**${act[0].name}**`

            let i = 1
            for(; i < 15; i++) {
                if (!act[i]) break;
                activity += `${ActivityType[act[i].type]} **${act[i].name}**\n`
            }
        }

        //Значки
        let ubadges = 'Остсутствуют'
        if(member.user.flags?.toArray() != '') ubadges = `${member.user.flags.toArray().map(flag => badges[flag]).join(', ')}`

        //Эмбед
        const embed = new MessageEmbed()
            .setTitle(`Информация о пользователе`)
            .setAuthor(member.user.tag, member.displayAvatarURL)
            .setDescription(`Ник на сервере: ${member.user}
ID: **${member.id}**
Значки: **${ubadges}**`)
        if (activity != '' || activity) embed.addField('Активность:', activity, true)
        embed.addField('Статус:', clientStatus.join('\n'), true)
        if (status != '' || status) embed.addField('Пользовательский статус:', status, true)
        embed.addField(`**Роли (${RolesCount}):**`, roles, false)
        embed.addField('Аккаунт создан:', `**${createdAt}** (${getDay(createdAtMS)} назад)`, true)
        embed.addField('Зашел на сервер:', `**${joinedAt}** (${getDay(joinedAtMS)} назад)`, true)
        embed.setColor(member.displayHexColor || '303136')
        embed.setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 2048
            }))
        embed.setFooter('Дизайн JeggyBot')
        embed.setTimestamp()
        message.channel.send(embed)
    }
}

function getDay(ms) {
    let day = 1000 * 60 * 60 * 24
    let message = '0 дней'
    if(ms >= day) message = timer(Math.round(ms / (1000 * 60 * 60 * 24)), ['день', 'дня', 'дней'])
    return message
}