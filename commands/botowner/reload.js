const {
  yes,
  error
} = require('../../utils/functions')

module.exports = {
  name: 'reload',
  description: "Перезагрузить команду",
  admin: true,
  aliases: ['rel', 'рел', 'релоад'],
  usage: '<команда>',
  category: 'botowner',
  args: true,
  execute(message, args) {
      const commandName = args[0].toLowerCase();
      const command = message.client.commands.get(commandName) ||
          message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if(!command) {
          return message.channel.send(error(`Нет команды с именем или псевдонимом \`${commandName}\`!`));
      }

      delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];

      try {
          const newCommand = require(`../${command.category}/${command.name}.js`);
          message.client.commands.set(newCommand.name, newCommand);
          message.channel.send(yes(`Команда \`${command.name}\` успешно перезагружена!`));
      } catch (err) {
          message.channel.send(error(`Ошибка в команде \`${command.name}\`!\n\n\`\`\`${err.stack}\`\`\``));
      }
  },
};