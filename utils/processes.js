const {
    readdirSync
} = require("fs");

module.exports = (bot) => {
    const processFiles = readdirSync("./processes/").filter((file) =>
        file.endsWith(".js")
    );

    processFiles.forEach((file) => {
        const processFile = require(`../processes/${file}`);

        if(!processFile.execute)
            throw new TypeError(`[ERROR]: execute! (${file})`);

        if(!processFile.name)
            throw new TypeError(`[ERROR]: имя! (${file})`);

        process.on(processFile.name, processFile.execute.bind(null, bot));

        delete require.cache[require.resolve(`../processes/${file}`)];
    });
};