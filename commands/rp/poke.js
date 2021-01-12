const {
    MessageEmbed
} = require("discord.js");
const {
    findMember
} = require('../../utils/functions');
const fetch = require("node-fetch");

module.exports = {
    name: "poke",
    description: "Тыкнуть в пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    aliases: ['тыкнуть', 'тыкаю'],
    async execute(message, args, bot) {
        const data = await fetch("https://nekos.life/api/v2/img/poke").then(res => res.json());
        const user = findMember(message, args.join(' ')); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете тыкать в себя!`);

        message.channel.send(new MessageEmbed()
        .setDescription(`${message.author} тыкает в ${user}`)
        .setImage(data.url)
        .setTimestamp());
    },
};