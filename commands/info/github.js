const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { formatDate, error } = require("../../utils/functions");

module.exports = {
  name: "github",
  description: "Поиск пользователей на github",
  category: "info",
  usage: '<Пользователь>',
  args: true,
  aliases: ["gh"],
  async execute(message, args) {
    const username = args[0];
    if (!username) return message.channel.send(error("Укажите правильный ник!"));

    const msg = await message.channel.send('Поиск...')
    const user = await fetch(`https://api.github.com/users/${username}`).then((res) => res.json());

    if (user.message === "Not Found") return msg.edit('', error("Пользователь не найден!"));

    const twitter = user.twitter_username
      ? `[@${user.twitter_username}](https://twitter.com/${user.twitter_username})`
      : "`Отсутствует`";
    const website = user.blog ? user.blog : "`Отсутствует`";
    const location = user.location ? user.location : "Отсутствует";
    const bio = user.bio ? user.bio : "Отсутствует";
    const gmail = user.email ? user.email : "Отсутствует";
    const company = user.company ? user.company : "Отсутствует"

    const embed = new MessageEmbed()
    .setAuthor(user.login, user.avatar_url, user.html_url)
    .setTitle(`Профиль`)
    .setDescription(`**ID:** \`${user.id}\`
[**Аватар**](${user.avatar_url})
**Тип:** \`${user.type}\`
**Компания:** \`${company}\`
**Локация:** \`${location}\`
**Почта:** \`${gmail}\`
**Сайт:** ${website}
**Твиттер:** ${twitter}

**Биография:** \`${bio}\``)
    .addField('Подписчиков:', `**${user.followers}**`, true)
    .addField('Подписок: ', `**${user.following}**`, true)
    .addField(`⁣⁣⁣⁣`, `⁣`, true)
    .addField('Дата создания', `**${formatDate(new Date(user.created_at))}**`, true)
    .addField('Аккаунт обновлен ', `**${formatDate(new Date(user.updated_at))}**`, true)
    .setColor("303136")
    .setThumbnail(user.avatar_url)
    msg.edit(" ", embed);
  },
};