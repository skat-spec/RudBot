const { prefix } = require('../config.json')

module.exports = {
    name: "ready",
    execute(bot) {
    console.log(`Залогинился как ${bot.user.tag}!`);
    const statuses = [
        `${prefix}help`,
        `By (ваш тег))`
    ];
    setInterval(() => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, { type: "WATCHING" });
    }, 15000);
  },
};