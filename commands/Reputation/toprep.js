const {
  MessageEmbed
} = require("discord.js");
const db = require("quick.db");
const {
  getUserRep
} = require('../../utils/functions')

module.exports = {
  name: "toprep",
  description: "Топ 10 пользователей по репутации",
  category: "Reputation",
  async execute(message) {
      const data = db
          .fetchAll()
          .filter((da) => da.ID.startsWith("rep_"))
          .sort((a, b) => b.data - a.data)
          .splice(0, 10);

      const embed = new MessageEmbed()
          .setTitle(`Топ по репутации`)
          .setDescription('На сервере никто не получил репутацию!')

      for(let i = 0; i < data.length; i++) {
          const guildId = message.guild.id;
          const userId = data[i].ID.replace(`rep_${guildId}_`, "");
          const user = message.guild.members.cache.get(userId);
          if(user && getUserRep(guildId, userId) != '0' || null) {
              embed.addField(`${user.user.tag}`, `**${data[i].data}** репутации`, true)
              embed.setDescription('')
          }
      }

      message.channel.send(embed);
  },
};