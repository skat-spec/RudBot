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
} = require('../../config.json')
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
        if(member.presence.status === 'offline') clientStatus.push(`${emoji.offline} Оффлайн\n`)
        else {
            if(member.presence.clientStatus.web) clientStatus.push(`${emoji[member.presence.clientStatus.web]} Сайт\n`);
            if(member.presence.clientStatus.mobile) clientStatus.push(`${emoji[member.presence.clientStatus.mobile]} Телефон\n`);
            if(member.presence.clientStatus.desktop) clientStatus.push(`${emoji[member.presence.clientStatus.desktop]} Компьютер\n`);
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

        const Roles = member.roles.cache.size - 1

        //Статус
        let status = '';
        let activity = '\n';
        if(member.user.presence.status != 'offline' && member.user.presence.activities[0]) {
            if(member.user.presence.activities[0].type === 'CUSTOM_STATUS') status = `${member.user.presence.activities[0].state === null ? '' : member.user.presence.activities[0].state}`;
            else status += `${ActivityType[member.user.presence.activities[0].type]} **${member.user.presence.activities[0].name}**`

            let i = 1
            for(; i < 11; i++) {
                if(member.user.presence.activities[i]) {
                    if(member.user.presence.activities[i].type === 'PLAYING' || 'STREAMING' || 'LISTENING' || 'WATCHING') activity += `${ActivityType[member.user.presence.activities[i].type]} **${member.user.presence.activities[i].name}**\n`
                }
            }
        }

        //Значки
        let ubadges = 'Остсутствуют'
        if(member.user.flags?.toArray() != '') ubadges = `${member.user.flags.toArray().map(flag => badges[flag]).join(', ')}`

        //Эмбед
        message.channel.send(new MessageEmbed()
            .setTitle(`Информация о пользователе`)
            .setAuthor(member.user.tag, member.displayAvatarURL)
            .setDescription(`Ник: **${member.user.tag} || ${member.user}**
ID: **${member.id}**
Статус: ${clientStatus}${status}
${activity}Значки: **${ubadges}**

**Роли(${Roles}):** ${roles}

Аккаунт создан: **${createdAt}** (${getDay(createdAtMS)} назад)
Зашел на сервер: **${joinedAt}** (${getDay(joinedAtMS)} назад)`)
            .setColor(member.displayHexColor || '303136')
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 2048
            }))
            .setFooter('Дизайн JeggyBot')
            .setTimestamp())
    }
}

function getDay(ms) {
    let day = 1000 * 60 * 60 * 24
    let message = '0 дней'
    if(ms >= day) message = timer(Math.round(ms / (1000 * 60 * 60 * 24)), ['день', 'дня', 'дней'])
    return message
}