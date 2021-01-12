const {
    MessageEmbed
} = require("discord.js");
const {
    findMember
} = require('../../utils/functions');
const fetch = require("node-fetch");

module.exports = {
    name: "tickle",
    description: "Пощекотать пользователя.",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    aliases: ['пощекотать', 'щекотать'],
    async execute(message, args, bpt) {
        const data = await fetch("https://nekos.life/api/v2/img/tickle").then(res => res.json());
        const user = findMember(message, args.join(' ')); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете пощекотать себя!`);

        message.channel.send(new MessageEmbed()
        .setTitle(`${message.author} щекочет ${user}`)
        .setImage(data.url)
        .setTimestamp());
    },
};