const { getServerPrefix, setServerPrefix, error, yes } = require("../../utils/functions");
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'prefix',
    description: 'Поменять префикс бота',
    category: 'cmds',
    aliases: ['pref'],
    usage: '<Новый префикс>',
    async execute(message, args) {
        const Nrefix = args[0];
        const Cprefix = await getServerPrefix(message.guild.id)

        if(!args[0]) return message.channel.send(new MessageEmbed() 
        .setDescription(`Текущий префикс: \`${Cprefix}\``))
        if(args[0]?.length > 7) return message.channel.send(error('Максимальная длина префикса: \`7\`'))
        if(Nrefix === Cprefix) return message.channel.send(error('Этот префикс уже стоит!'))

        if (message.author.id === '448799481777881089') {
            setServerPrefix(message.guild.id, Nrefix);
          } else if (message.member.permissions.has(["MANAGE_GUILD"])) {
            setServerPrefix(message.guild.id, Nrefix);
          } else return message.channel.send(error(`У вас недостаточно прав! (**Управлять сервером**)`))

        message.channel.send(yes(`Вы успешно поставили префикс! Теперь он \`${Nrefix}\``))
    }
};