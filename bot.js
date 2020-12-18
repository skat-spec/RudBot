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
    partials: ["GUILD_MEMBER", "MESSAGE", "USER", "REACTION"],
    restRequestTimeout: 25000,
});
const {
    Player
} = require("discord-player");
const AlexClient = require("alexflipnote.js");

bot.player = new Player(bot);
bot.commands = new Collection();
bot.cooldowns = new Collection();
bot.aliases = new Collection();

if(AlexFlipNoteKey) {
    bot.alexClient = new AlexClient(AlexFlipNoteKey);
}
require("./utils/command")(bot);
require("./utils/events")(bot);
require("./utils/checkValid")();

bot.login(token)