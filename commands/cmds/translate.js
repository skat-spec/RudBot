const { MessageEmbed } = require("discord.js");
const { error } = require('../../utils/functions')
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
    name: "translate",
    description: "Перевод вашего сообщения ([Коды языков](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2))",
    args: true,
    category: 'cmds',
    usage: '<Язык> <Ваше сообщение>',
    aliases: ['перевести', 'перевод', 'trans'],
    async execute(message, args) {
        const result = await translate(args.slice(1).join(" "), { to: args[0] });
        
        if (!result || !args[1]) {
            return message.channel.send(error(`Правильное использование команды: \`/translate <Язык> <Ваше сообщение>\`
            [Коды языков](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2)`));
        }

        message.channel.send(new MessageEmbed()
        .setDescription(result.text)
        .setFooter(message.author.username)
        .setTimestamp()
        .setTitle("Google Переводчик"));
    }
};