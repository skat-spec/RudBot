const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "playlistAdd",
  async execute(bot, message, queue, playlist) {
      return message.channel.send(new MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setTitle(`Песня добавлена в очередь! (${playlist} песен в очереди)`))
  },
};