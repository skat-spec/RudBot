const {
    MessageEmbed
} = require("discord.js");
const {
    error
} = require('../../utils/functions')
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
    name: "translate",
    description: "Перевод вашего сообщения (Коды языков: https://bit.ly/3matOYI)",
    args: true,
    category: 'cmds',
    usage: '<Язык> <Ваше сообщение>',
    aliases: ['перевести', 'перевод', 'trans'],
    async execute(message, args) {
        const result = await translate(args.slice(1).join(" "), {
            to: args[0]
        });

        if(!result || !args[1]) {
            return message.channel.send(error(`Правильное использование команды: \`/translate <Язык> <Ваше сообщение>\`
Коды языков: https://bit.ly/3matOYI`));
        }

        message.channel.send(new MessageEmbed()
            .setDescription(result.text)
            .setFooter(message.author.username)
            .setTimestamp()
            .setTitle("Google Переводчик"));
    }
};