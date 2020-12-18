const {
    error
} = require('../utils/functions')

module.exports = {
    name: "noResults",
    async execute(bot, message) {
      return message.channel.send(error('Я ничего не нашел!'));
    },
  };