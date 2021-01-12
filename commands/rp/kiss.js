const {
    MessageEmbed
} = require("discord.js");
const {
    findMember
} = require('../../utils/functions');
const fetch = require("node-fetch");

module.exports = {
    name: "kiss",
    description: "Поцеловать пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    aliases: ['поцеловать', 'kis', 'целую'],
    async execute(message, args, bot) {
        const data = await fetch("https://nekos.life/api/kiss").then(res => res.json());
        const user = findMember(message, args.join(' ')); 

        if(message.author.id === user?.id) return message.channel.send(`Вы не можете поцеловать себя!`);

        message.channel.send(new MessageEmbed()
        .setDescription(`${message.author} целует ${user}`)
        .setImage(data.url)
        .setTimestamp());
    },
};