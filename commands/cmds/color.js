const {
    MessageEmbed
} = require("discord.js");
const {
    error
} = require('../../utils/functions')

module.exports = {
    name: "color",
    description: "Цвет",
    aliases: ['цвет'],
    args: true,
    usage: 'Цвет в HEX формате',
    category: "cmds",
    async execute(message, args, bot) {
        const data = await bot.alexClient.others.color(args.join(" "));
        if(!data) return message.channel.send(error('Цвет не найден! (пример: \`FFFFFF\`)'))

        message.channel.send(new MessageEmbed()
            .setTitle(`${data.name} (${data.hex.toUpperCase()})`)
            .setDescription(`Яркость: \`${data.brightness}\`
\`${data.rgb}\``)
            .setImage(data.image_gradient)
            .setThumbnail(data.image)
            .setColor(data.hex)
            .addField('Градиент:', data.tint.join(', '), true)
        )
    }
}