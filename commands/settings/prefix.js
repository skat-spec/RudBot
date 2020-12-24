const {
  getServerPrefix,
  setServerPrefix,
  error,
  yes
} = require("../../utils/functions");
const {
  Xaliks
} = require('../../config.json')
const {
  MessageEmbed
} = require('discord.js')

module.exports = {
  name: 'prefix',
  description: 'Поменять префикс бота',
  category: 'settings',
  aliases: ['pref'],
  usage: '<Новый префикс>',
  async execute(message, args) {
      const Nrefix = args[0];
      const Cprefix = await getServerPrefix(message.guild.id)

      if(!Nrefix) return message.channel.send(new MessageEmbed()
          .setDescription(`Текущий префикс: \`${Cprefix}\``))
      if(args[0]?.length > 7) return message.channel.send(error('Максимальная длина префикса: \`7\`'))
      if(Nrefix === Cprefix) return message.channel.send(error('Этот префикс уже стоит!'))

      if(
      message.author.id === Xaliks || 
      message.member.permissions.has(["MANAGE_GUILD"] ||
      message.member.permissions.has(["ADMINISTRATOR"]))) setServerPrefix(message.guild.id, Nrefix);
      else return message.channel.send(error(`У вас недостаточно прав! (**Управлять сервером** или **Администратор**)`))

      message.channel.send(yes(`Вы успешно поставили префикс! Теперь он \`${Nrefix}\``))
  }
};