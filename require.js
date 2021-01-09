const {
    Collection
} = require('discord.js');
const {
    AlexFlipNoteKey,
    BrawlstarsToken
} = require('./config.json');
const {
    Client
} = require("brawlstars");
const {
    Player
} = require("discord-player");
const AlexClient = require("alexflipnote.js");

module.exports = (bot) => {
    bot.player = new Player(bot);
    bot.commands = new Collection();
    bot.cooldowns = new Collection();
    bot.aliases = new Collection();
    bot.BS = new Client(BrawlstarsToken);
    bot.alexClient = new AlexClient(AlexFlipNoteKey);

    require("./utils/command")(bot);
    require("./utils/events")(bot);
    require("./utils/checkValid")();
    require("./GitHub/profile")(bot);
    require("./utils/processes")(bot);
};