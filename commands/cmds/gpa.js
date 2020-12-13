const {
    MessageEmbed
} = require('discord.js')
const {
    error
} = require('../../utils/functions')

module.exports = {
    name: "gpa",
    description: "Средний балл оценок",
    usage: '<кол-во 5> <кол-во 4> <кол-во 3> <кол-во 2>',
    category: 'cmds',
    async execute(message, args) {
        if(!args[0]) return message.channel.send(error('Введите кол-во пятёрок'))
        if(!args[1]) return message.channel.send(error('Введите кол-во четвёрок'))
        if(!args[2]) return message.channel.send(error('Введите кол-во троек'))
        if(!args[3]) return message.channel.send(error('Введите кол-во двоек'))
        let n5 = parseInt(args[0]);
        let n4 = parseInt(args[1]);
        let n3 = parseInt(args[2]);
        let n2 = parseInt(args[3]);
        let i = (5 * n5 + 4 * n4 + 3 * n3 + 2 * n2) / (n5 + n4 + n3 + n2)
        message.channel.send(new MessageEmbed()
            .setTitle('Средний балл')
            .setDescription('Ваш средний балл: ' + i.toFixed(2)))
    }
}