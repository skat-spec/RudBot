const cheerio = require("cheerio");
const request = require("request");
const {
    MessageEmbed
} = require('discord.js')
const options = {
    url: "https://randstuff.ru/joke/",
    method: "GET",
    headers: {
        Accept: "text/html",
        "User-Agent": "Chrome",
    },
};

module.exports = {
    name: "random-joke",
    description: "Рандомная шутка",
    aliases: ["rj", "randomjoke"],
    category: 'cmds',
    async execute(message) {
        request(options, function(error, _response, responseBody) {
            if(error) return;
            const $ = cheerio.load(responseBody);
            const link = $("table[class=text]").text()

            message.channel.send(new MessageEmbed()
                .setTitle('Рандомная шутка')
                .setDescription(link));
        });
    }
}