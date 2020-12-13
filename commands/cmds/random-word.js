const cheerio = require("cheerio");
const request = require("request");
const {
    MessageEmbed
} = require('discord.js')
const options = {
    url: "https://calculator888.ru/random-generator/sluchaynoye-slovo",
    method: "GET",
    headers: {
        Accept: "text/html",
        "User-Agent": "Chrome",
    },
};

module.exports = {
    name: "random-word",
    description: "Рандомное слово",
    aliases: ["randomword"],
    category: 'cmds',
    async execute(message) {
        request(options, function(error, _response, responseBody) {
            if(error) return;
            const $ = cheerio.load(responseBody);
            const link = $("div[class=blok_otvet]").text()

            message.channel.send(new MessageEmbed()
                .setTitle('Рандомное слово')
                .setDescription(link));
        });
    }
}