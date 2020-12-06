const { yes, error } = require('../../utils/functions')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'bash',
    description: 'Команды в консоль',
    args: true,
    admin: true,
    category: 'botowner',
    usage: '<команда в консоль>',
    aliases: ['exe', 'console', 'shell'],
    async execute(message, args) {
        const msg = await message.channel.send(new MessageEmbed()
        .setDescription('Жду ответа...'))
        try {
        let out = require('child_process').execSync(args.join(' ')).toString('utf8')
            msg.edit(yes(`\`\`\`${out ? out : 'нет выхода.'}\`\`\``, { split: "\n", code: 'js' }))
    }catch(err) {
        msg.edit(error(`\`\`\`${err}\`\`\``, { split: "\n", code: 'js' }))
    }
    },
}
