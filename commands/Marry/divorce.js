const {
    findMember,
    getMarry,
    delMarry,
    yes,
    error
} = require('../../utils/functions')

module.exports = {
    name: "divorce",
    description: "Развестись",
    usage: "<Пользователь>",
    category: "Marry",
    aliases: ['развестись', 'развод'],
    args: true,
    async execute(message, args, bot) {
        const user = await findMember(message, args.join(" ")).user
        if(user === message.author) return message.channel.send(error('Как вы разведётесь с собой?'))
        if(!getMarry(message.guild.id, user.id) && !getMarry(message.guild.id, message.author.id)) return message.channel.send(error('Вы не пара!'))
        delMarry(message.guild.id, user.id, message.author.id)
        delMarry(message.guild.id, message.author.id, user.id)
        message.channel.send(yes(`${message.author}, Вы успешно развелись с ${user}.`));
    }
};
