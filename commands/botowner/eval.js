const {
    MessageEmbed
} = require('discord.js')
const {
    emoji
} = require('../../config.json')

module.exports = {
    name: 'eval',
    description: 'Eval',
    admin: true,
    usage: '<команда>',
    category: 'botowner',
    aliases: ['e', 'ebal', 'евал'],
    admin: true,
    async execute(message, args, bot) {
        let tyype = {
            "Undefined": "Неопределенный",
            "Boolean": "Логический",
            "Number": "Число",
            "String": "Строка",
            "Object": "Объект"
        }
        const msg = await message.channel.send(new MessageEmbed()
            .setDescription('Отправляю...'))

        try {
            let evaled = eval(args.join(' '));
            if(evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled
            let eevaled = typeof evaled;
            evaled = require('util').inspect(evaled, {
                depth: 0,
                maxArrayLength: null
            })
            const type = eevaled[0].toUpperCase() + eevaled.slice(1)

            msg.edit(new MessageEmbed()
                .setTitle('Eval')
                .setDescription(`**Успешно ${emoji.yes}** 
**Тип:** \`${tyype[type]}\`
**Готово за:** \`${Date.now() - message.createdTimestamp + 'ms'}\` 
**Вход:**\`\`\`js\n${args.join(' ')} \`\`\`
**Выход:**\`\`\`js\n${evaled}\n\`\`\``))
        } catch (err) {
            msg.edit(new MessageEmbed()
                .setTitle(`Eval`)
                .setDescription(`Ошибка ${emoji.error} 

\`\`\`${err.stack}\`\`\``))
        }
    }
};