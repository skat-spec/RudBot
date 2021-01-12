const {
    MessageEmbed
} = require("discord.js");
const {
    findMember
} = require('../../utils/functions');
const fetch = require("node-fetch");

module.exports = {
    name: "slap",
    description: "Дать пощечины пользователю.",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    async execute(message, args, bot) {
        const data = await fetch("https://nekos.life/api/v2/img/slap").then(res => res.json());
        const user = findMember(message, args.join(' ')); 

        if(message.author.id === user.id) return message.channel.send(`Вы не можете дать себе пощечину!`);

        message.channel.send(new MessageEmbed()
        .setDescription(`${message.author} даёт пощечину ${user}`)
        .setImage(data.url)
        .setTimestamp());
    },
};