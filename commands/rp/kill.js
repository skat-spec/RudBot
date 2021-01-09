const {
    MessageEmbed
} = require("discord.js");
const {
    findMember
} = require('../../utils/functions');
const fetch = require("node-fetch");

module.exports = {
    name: "kill",
    description: "Убить пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    aliases: ['убить', 'убиваю'],
    async execute(message, args, bot) {
        const data = await fetch("https://miss.perssbest.repl.co/api/v2/kill").then(res => res.json());
        const user = findMember(message, args.join(' '));

        if(message.author.id === user.id) return message.channel.send(`Вы не можете убить себя!`);

        message.channel.send(new MessageEmbed()
        .setDescription(`${message.author} Убил ${user}`)
        .setImage(`${data.image}`)
        .setTimestamp());
    },
};