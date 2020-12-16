const {
  MessageEmbed
} = require('discord.js')
const {
  formatDate,
  timer
} = require("../../utils/functions");
const ms = require('ms')
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
  guildOnly: true,
  async execute(message, args) {
      let member =
          message.guild.members.cache.get(args[0]) ||
          message.mentions.members.first() ||
          message.member

      const id = member.id;

      const data = [];
      if(member.presence.status === 'offline') data.push(`${emoji.offline} Оффлайн`)
      else {
          if(member.presence.clientStatus.web) data.push(`${emoji[member.presence.clientStatus.web]} Сайт`);
          if(member.presence.clientStatus.mobile) data.push(`${emoji[member.presence.clientStatus.mobile]} Телефон`);
          if(member.presence.clientStatus.desktop) data.push(`${emoji[member.presence.clientStatus.desktop]} Компьютер`);
      }



          const joinedAt = formatDate(new Date(member.joinedAt))
          const createdAt = formatDate(new Date(member.user.createdAt))
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
          let status = ``
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

          let date1 = new Date(message.createdTimestamp)
          let date2 = new Date(member.user.createdTimestamp)
          let date3 = new Date(message.guild.member(member).joinedTimestamp)
          let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime())))
          let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime())))

          let ubadges = 'Остсутствуют'
          if(member.user.flags.toArray() != '') ubadges = `${member.user.flags.toArray().map(flag => badges[flag]).join(', ')}`

          message.channel.send(new MessageEmbed()
              .setTitle(`Информация о пользователе`)
              .setAuthor(member.user.tag, member.displayAvatarURL)
              .setDescription(`Ник: **${member.user.tag} || ${member.user}**
ID: **${id}**
Статус: ${data.join(',\n')}
Значки: ${status}
**${ubadges}**

**Роли(${roleCount}):** ${roles}

Аккаунт создан: **${createdAt}** (${timer(parseInt(ms(diff1).match(/\d+/)), ['день', 'дня', 'дней'])} назад)
Зашел на сервер: **${joinedAt}** (${timer(parseInt(ms(diff2).match(/\d+/)), ['день', 'дня', 'дней'])} назад)`)
              .setColor(member.displayHexColor || '303136')
              .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
              .setFooter('Дизайн JeggyBot')
              .setTimestamp())
  }
}