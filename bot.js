const {
  Collection,
  Client,
  MessageEmbed
} = require('discord.js');
const {
  token,
  AlexFlipNoteKey
} = require('./config.json');
const bot = new Client({
  disableMentions: "everyone",
  fetchAllMembers: true,
  partials: ["GUILD_MEMBER", "MESSAGE", "USER", "REACTION"]
});
const AlexClient = require("alexflipnote.js");

bot.commands = new Collection();
bot.cooldowns = new Collection();
bot.aliases = new Collection();
bot.code = function(name) {
  return bot.commands.get(name).execute.toString()
}
if(AlexFlipNoteKey) {
  bot.alexClient = new AlexClient(AlexFlipNoteKey);
}
require("./utils/command")(bot);
require("./utils/events")(bot);

process.on('unhandledRejection', async (err) => {
  const w = await bot.guilds.cache.get('717450963442466886').fetchWebhooks();
  const webhook = w.find((w) => w.name === 'Errors.log');
  if(!webhook || err.stack.startsWith('DiscordAPIError: Missing Permissions')) return;
  webhook.send('<@448799481777881089>', new MessageEmbed()
      .setTitle('Новая ошибка!')
      .addField('**Короткая ошибка:**', `\`${err || 'Отстутствует'}\``, true)
      .addField('**Имя:**', `\`${err.name || 'Отстутствует'}\``, true)
      .addField('**Код ошибки:**', `\`${err.code || 'Отстутствует'}\``, true)
      .addField('**Патч:**', `\`${err.path || 'Отстутствует'}\``, true)
      .addField('**http Статус:**', `\`${err.httpStatus || 'Отстутствует'}\``, true)
      .setDescription(`**Ошибка:**\n\`\`\`${err.stack || 'Отстутствует'}\`\`\``))
});

bot.login(token)