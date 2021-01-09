const { Client } = require('discord.js');
const { token } = require('./config.json');
const bot = new Client({
    disableMentions: "everyone",
    fetchAllMembers: true,
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});

require("./require")(bot);

bot.login(token);