const config = require("../config.json");
const Logger = require("./Logger");

function checkValid() {
    const v = parseFloat(process.versions.node);

    if(v < 14) {
        throw Error("[ERROR]: Бот только на >14 версию Node.JS!");
    }

    if(!config.token || config.token === "") {
        throw Error("[ERROR][BOT]: Нужен токен бота!");
    }

    if(!config.prefix || config.prefix === "") {
        throw Error("[ERROR][BOT]: Нужен префикс бота!");
    }

    if(!config.AlexFlipNoteKey || config.AlexFlipNoteKey === "") {
        Logger.warn("bot", "AlexFlipNoteKey нужен для команд!");
    }

    if(!config.Xaliks) {
        Logger.warn("bot", "Нужен ID создателя бота!");
    }
}

module.exports = checkValid;