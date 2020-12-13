const {
  MessageEmbed
} = require("discord.js");
const {
  error
} = require('../../utils/functions');
const fetch = require('node-fetch');

module.exports = {
  name: "skin",
  description: "Поиск скинов из Minecraft",
  category: "info",
  usage: '<Ник игрока>',
  args: true,
  async execute(message, args) {
      const msg = await message.channel.send('Поиск...')
      const uuuid = await fetch(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(
      args[0]
    )}`).then(res => res.json());
      if(!uuuid.success || uuuid?.error) return msg.edit('', error(`Игрок \`${args[0]}\` не найден!`));
      const uuid = uuuid.data.player;
      const full = `https://visage.surgeplay.com/full/2048/${uuid.id}.png`;
      const skin = `https://visage.surgeplay.com/skin/2048/${uuid.id}.png`;
      const face = `https://visage.surgeplay.com/face/2048/${uuid.id}.png`;
      msg.edit('', new MessageEmbed()
          .setAuthor(`Скин игрока ${uuid.username}`, face)
          .setDescription(`[Скачать скин](${skin})`)
          .setImage(full));
  },
}