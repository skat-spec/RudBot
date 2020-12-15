const {
  Xaliks
} = require('../config.json')
const {
  formatDate
} = require('../utils/functions')
const {
  MessageEmbed
} = require('discord.js')
const fetch = require("node-fetch");

module.exports = {
  name: "ready",
  execute(bot) {
      console.log(`Залогинился как ${bot.user.tag}!`);
      //minecraft server (TBR) 
      setInterval(async () => {
          bot.guilds.cache.get('681142809654591501').channels.cache.get('746730791144259676').messages.fetch('767034197713485825').then(async function(message) {
              const data = await fetch(`https://api.mcsrvstat.us/2/mc.aresmine.ru`).then(res => res.json());
              message.edit(`Обновление было ${formatDate(new Date(Date.now()))}`, new MessageEmbed()
                  .setFooter(message.author.username)
                  .setColor("303136")
                  .setTitle(`Информация о minecraft сервере`)
                  .setDescription(`\`Версия:\` **${data.version}**
\`IP:\` **${data.ip} ${data.hostname ? `/ ${data.hostname}` : ''}**
\`\`\`diff
Статус:
${data.online ? '+ ONLINE': '- OFFLINE'}
\`\`\`

\`Игроков:\` **${data.players.online} / ${data.players.max}**

**Описание:** \n\`${data.motd.clean}\``)
                  .setThumbnail(`https://api.mcsrvstat.us/icon/mc.aresmine.ru`)
                  .setTimestamp())
          })
      }, 360000);

      const statuses = [
          `/help`,
          `By ${bot.users.cache.get(Xaliks).tag}`,
          `Спасибо ${bot.users.cache.get('637309157997019136').tag} за донат ❤`,
          `Спасибо ${bot.users.cache.get('500638624837140484').tag} и ${bot.users.cache.get('597854685457678338').tag} за донат ❤`
      ];
      setInterval(() => {
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          bot.user.setActivity(status, {
              type: "WATCHING"
          });
      }, 10000);
  },
};
