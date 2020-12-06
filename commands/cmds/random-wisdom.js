const cheerio = require("cheerio");
const request = require("request");
const { MessageEmbed } = require('discord.js')
const options = {
  url: "https://randstuff.ru/saying/",
  method: "GET",
  headers: {
    Accept: "text/html",
    "User-Agent": "Chrome",
  },
};

module.exports = {
    name: "random-wisdom",
    description: "Рандомная мудрость",
    aliases: ["rw", "randomwisdom"],
    category: 'cmds',
    async execute(message) {
        request(options, function (error, _response, responseBody) {
          if (error) return;
          const $ = cheerio.load(responseBody);
          //.split('— '). Да я гениален!
          let wisdom = $("table[class=text]").text().split('— ')
          let author = $("span[class=author]").text()
    
          message.channel.send(new MessageEmbed()
          .setTitle('Рандомная мудрость')
          .setDescription(wisdom[0])
          .setFooter(author));
        });
    }
}