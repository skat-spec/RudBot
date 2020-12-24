const {
  Xaliks
} = require('../config.json')

module.exports = {
  name: "ready",
  execute(bot) {
      console.log(`[DISCORD] Залогинился как ${bot.user.tag}!`);
      const statuses = [
          `/help`,
          `By ${bot.users.cache.get(Xaliks).tag}`
      ];
      setInterval(() => {
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          bot.user.setActivity(status, {
              type: "WATCHING"
          });
      }, 10000);
  },
};
