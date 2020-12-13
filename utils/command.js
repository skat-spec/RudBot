const fs = require("fs");
const {
    sep
} = require("path");
const {
    Collection
} = require("discord.js");

module.exports = (bot) => {
    const dir = "./commands";
    fs.readdirSync(dir).forEach((dirs) => {
        const commands = fs
            .readdirSync(`${dir}${sep}${dirs}${sep}`)
            .filter((f) => f.endsWith(".js"));

        for(const file of commands) {
            const cmd = require(`../commands/${dirs}/${file}`);

            if(!cmd.execute)
                throw new TypeError(
                    `[ERROR][COMMANDS]: execute! (${file})`
                );

            if(!cmd.name)
                throw new TypeError(
                    `[ERROR][COMMANDS]: Имя! (${file})`
                );

            if(cmd.name.trim() === "")
                throw new TypeError(
                    `[ERROR][COMMANDS]: Имя! (${file})`
                );

            if(cmd.aliases) {
                for(const alias of cmd.aliases) {
                    bot.aliases.set(alias, cmd.name);
                }
            }

            bot.commands.set(cmd.name, cmd);

            const cooldowns = bot.cooldowns;

            if(!cooldowns.has(cmd.name)) {
                cooldowns.set(cmd.name, new Collection());
            }
        }
    });
};