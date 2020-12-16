const {
  Collection,
  Client
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
//хз зачем это вам. Мне это нужно
bot.code = function(name) {
  return bot.commands.get(name).execute.toString()
}
if(AlexFlipNoteKey) {
  bot.alexClient = new AlexClient(AlexFlipNoteKey);
}
require("./utils/command")(bot);
require("./utils/events")(bot);

bot.login(token)