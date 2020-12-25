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
        const {
            id
        } = member;
        const data = [];
        if(member.presence.status === 'offline') data.push(`${emoji.offline} Оффлайн`)
        else {
            if(member.presence.clientStatus.web) data.push(`${emoji[member.presence.clientStatus.web]} Сайт`);
            if(member.presence.clientStatus.mobile) data.push(`${emoji[member.presence.clientStatus.mobile]} Телефон`);
            if(member.presence.clientStatus.desktop) data.push(`${emoji[member.presence.clientStatus.desktop]} Компьютер`);
        }
        let date1 = new Date(message.createdTimestamp)
        let date2 = new Date(member.user.createdTimestamp)
        let date3 = new Date(message.guild.member(member).joinedTimestamp)
        const createdAtMS = Math.round(Math.abs((date1.getTime() - date2.getTime())))
        const joinedAtMS = Math.round(Math.abs((date1.getTime() - date3.getTime())))
        let ubadges = 'Остсутствуют'
        const joinedAt = formatDate(date3)
        const createdAt = formatDate(date2)
        const roles =
            member.roles.cache
            .filter((r) => r !== message.guild.id)
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1)
            .join(", ") || "**Остсутствуют**"

        const roleCount = member.roles.cache.filter(
            (r) => r.id !== message.guild.id
        ).size;
        let status;
        if(member.user.presence.status != 'offline') {
            if(member.user.presence.activities[0]) {
                if(member.user.presence.activities[0].type === 'CUSTOM_STATUS') status = `\n ${member.user.presence.activities[0].state} \n`;
                else status = `\n${ActivityType[member.user.presence.activities[0].type]} **${member.user.presence.activities[0].name}**`
            }
            let i = 1
            for(; i < 11; i++) {
                if(member.user.presence.activities[i]) {
                    if(member.user.presence.activities[i].type === 'PLAYING' || 'STREAMING' || 'LISTENING' || 'WATCHING') status += `\n${ActivityType[member.user.presence.activities[i].type]} **${member.user.presence.activities[i].name}**`
                }
            }
        }
        if(member.user.flags.toArray() != '') ubadges = `${member.user.flags.toArray().map(flag => badges[flag]).join(', ')}`

        message.channel.send(new MessageEmbed()
            .setTitle(`Информация о пользователе`)
            .setAuthor(member.user.tag, member.displayAvatarURL)
            .setDescription(`Ник: **${member.user.tag} || ${member.user}**
ID: **${id}**
Статус: ${data.join(',\n')}
${status}
Значки: **${ubadges}**

**Роли(${roleCount}):** ${roles}

Аккаунт создан: **${createdAt}** (${getDay(createdAtMS)} назад)
Зашел на сервер: **${joinedAt}** (${getDay(joinedAtMS)} назад)`)
            .setColor(member.displayHexColor || '303136')
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true
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