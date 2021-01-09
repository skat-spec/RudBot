const {
    sendErrorLog
} = require('../utils/functions')

module.exports = {
    name: "unhandledRejection",
    async execute(bot, err) {
        if(String(err) === 'DiscordAPIError: Missing Permissions' ||
        String(err) === 'DiscordAPIError: Unknown Message') return;
        sendErrorLog(bot, err)
    }
};