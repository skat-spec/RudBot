const {
    findMember,
    getMarry,
    setMarry,
    yes,
    error
} = require('../../utils/functions')

module.exports = {
    name: 'marry',
    description: 'Пожениться',
    category: 'Marry',
    args: true,
    usage: "<Пользователь>",
    aliases: ['жениться'],
    async execute(message, args, bot) {
        const user = await findMember(message, args.join(" ")).user
        if(user === message.author) return message.channel.send(error('Как вы поженитесь на себе?'))
        if(getMarry(message.guild.id, user.id)) return message.channel.send(error('Он(-а) уже состоит в браке!'))
        if (getMarry(message.guild.id, message.author.id)) return message.channel.send(error('Вы уже состоите в браке!'))
        if(user.bot) return message.channel.send(error('Это бот. ОДУМОЙСЯ!'))
        const filter = (m) => user.id === m.author.id;
        message.channel.send(`${user}, Вы хотите выйти замуж за ${message.author}? **Да/Нет** (У вас есть 15 секунд)`)

        message.channel
            .awaitMessages(filter, {
                time: 15000,
                max: 1,
                errors: ["time"]
            })
            .then(async (msgs) => {
                const msg = msgs.first();
                if(["y", "yes", "д", "да"].includes(msg.content.toLowerCase())) {
                    setMarry(message.guild.id, user.id, message.author.id)
                    setMarry(message.guild.id, message.author.id, user.id)
                    message.channel.send(yes(`${user}, Вы успешно поженились с ${message.author}. Поздравляю!`));
                } else {
                    message.channel.send(`${message.author} Сочувствую.`);
                }
            })
    },
}