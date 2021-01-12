const {
    MessageEmbed
} = require("discord.js");
const {
    findMember
} = require('../../utils/functions');
const fetch = require("node-fetch");

module.exports = {
    name: "feed",
    description: "Накормить пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    aliases: ['кормить', 'покормить', 'кормлю'],
    async execute(message, args, bot) {
        const data = await fetch("https://nekos.life/api/v2/img/feed").then(res => res.json());
        const user = findMember(message, args.join(' '));

        if(message.author.id === user.id) return message.channel.send(`Вы не можете покормить себя!`);

        message.channel.send(new MessageEmbed()
            .setDescription(`${message.author} кормит ${user}`)
            .setImage(data.url)
            .setTimestamp());
    },
};