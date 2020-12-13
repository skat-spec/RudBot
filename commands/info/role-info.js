const {
  MessageEmbed
} = require("discord.js");
const {
  formatDate,
  error
} = require("../../utils/functions");

module.exports = {
  name: "role-info",
  description: "Информация о роли",
  aliases: ['role', 'роль', 'roleinfo', 'инфороль', 'роль-инфо', 'ri'],
  args: true,
  usage: '<Роль/ID>',
  category: "info",
  guildOnly: true,
  execute(message, args) {
      const role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.find((role) => role.name === args[0]) ||
          message.guild.roles.cache.find((role) => role.id === args[0]);

      if(!role) return message.channel.send(error('Не могу найти роль!'));

      let mentionable = role.mentionable ? "Да" : "Нет";
      let hoist = role.hoist ? "Да" : "Нет";
      let name = role.name;
      let id = role.id;
      let color = role.color;
      let position = message.guild.roles.cache.size - role.position

      message.channel.send(new MessageEmbed()
          .setTitle(`**ИНФОРМАЦИЯ О РОЛИ**`)
          .setColor(color)
          .addField(`**Имя**`, `${name}`, true)
          .addField("**ID**", id, true)
          .addField("**Упоминание**", `\`${role}\` / ${role}`, true)
          .addField("**Пользователей с этой ролью:**", role.members.size, true)
          .addField("**Цвет**", role.hexColor.toUpperCase(), true)
          .addField("**Позиция:**", `${position}`, true)
          .addField("**Отображаемая роль?**", hoist, true)
          .addField("**Упоминается?**", mentionable, true)
          .addField("**Создана**", `${formatDate(role.createdAt)}`, true)
          .setTimestamp()
          .setFooter(message.author.username));
  },
};