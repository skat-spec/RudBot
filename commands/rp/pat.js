const {
    MessageEmbed
} = require("discord.js");
const {
    findMember
} = require('../../utils/functions');
const fetch = require("node-fetch");

module.exports = {
    name: "pat",
    description: "Погладить пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    aliases: ['гладить', 'погладить', 'глажу'],
    async execute(message, args, bot) {
        const data = await fetch("https://nekos.life/api/v2/img/pat").then(res => res.json());
        const user = findMember(message, args.join(' ')); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете погладить себя!`);

        message.channel.send(new MessageEmbed()
        .setDescription(`${message.author} гладит ${user}`)
        .setImage(data.url)
        .setTimestamp());
    },
};