const {
    MessageEmbed
} = require("discord.js");
const {
    findMember
} = require('../../utils/functions');
const fetch = require("node-fetch");

module.exports = {
    name: "hug",
    description: "Обнять пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    aliases: ['обнять', 'обнимаю'],
    async execute(message, args, bot) {
        const data = await fetch("https://nekos.life/api/v2/img/hug").then(res => res.json());
        const user = findMember(message, args.join(' '));

        if(message.author.id === user.id) return message.channel.send(`Вы не можете обнять себя!`);

        message.channel.send(new MessageEmbed()
            .setDescription(`${message.author} обнимает ${user}`)
            .setImage(data.url)
            .setTimestamp());
    },
};