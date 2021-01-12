const {
    Collection
} = require('discord.js');
const {
    AlexFlipNoteKey
} = require('./config.json');
const {
    Player
} = require("discord-player");
const AlexClient = require("alexflipnote.js");

module.exports = (bot) => {
    bot.player = new Player(bot);
    bot.commands = new Collection();
    bot.cooldowns = new Collection();
    bot.aliases = new Collection();
    bot.alexClient = new AlexClient(AlexFlipNoteKey);

    require("./utils/command")(bot);
    require("./utils/events")(bot);
    require("./utils/checkValid")();
    require("./GitHub/profile")(bot);
    require("./utils/processes")(bot);
};