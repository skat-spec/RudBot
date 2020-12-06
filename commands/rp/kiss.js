const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "kiss",
    description: "Поцеловать пользователя",
    args: true,
    usage: '<@Пользователь>',
    category: 'rp',
    guildOnly: true,
    aliases: ['поцеловать', 'kis', 'целую'],
    async execute(message) {
        let user = message.mentions.users.first(); 

        if(message.author.id === user?.id) return message.channel.send(`Вы не можете поцеловать себя!`)

        const data = await fetch("https://nekos.life/api/kiss").then(res => res.json());

        message.channel.send(new MessageEmbed()
        .setFooter(message.author.username)
        .setTitle(`${message.author.username} целует ${user.username}`)
        .setImage(`${data.url}`)
        .setTimestamp());
    }
};