const {
    MessageEmbed,
    version
} = require("discord.js");
const {
    formatDate,
    time
} = require("../../utils/functions");
const {
    Xaliks
} = require('../../config.json')
const {
    mem,
    cpu,
    os
} = require('node-os-utils');

module.exports = {
    name: 'stats',
    description: 'Статистика бота',
    aliases: ['инфо'],
    usage: '',
    category: 'info',
    async execute(message, args, bot) {
        const {
            totalMemMb,
            usedMemMb
        } = await mem.info();
        var ping = Date.now() - message.createdTimestamp
        const duration = time(bot.uptime)
        let createdAt = formatDate(bot.user.createdAt);
        let servers = bot.guilds.cache.size
        let users = bot.users.cache.size
        let call = bot.channels.cache.size
        let categories = bot.channels.cache.filter(c => c.type === 'category').size
        let voice = bot.channels.cache.filter(c => c.type === 'voice').size
        let text = bot.channels.cache.filter(c => c.type === 'text').size

        message.channel.send(new MessageEmbed()
        .setColor("303136")
        .setTitle('Инфо')
        .setDescription(`**Создатель:** \`${bot.users.cache.get(Xaliks).tag}\`
**Создан:** \`${createdAt}\`

**Кол-во команд:** \`${bot.commands.size - bot.commands.filter(cmd => cmd.admin).size - bot.commands.filter(cmd => cmd.category === 'nsfw').size}\`
:bust_in_silhouette: **Пользователей:** \`${users}\`
**Серверов:** \`${servers}\`
**Каналов ${call}**: Категорий / Текст. / Гол.  
**${categories} / ${text} / ${voice}**

**Ответ на команды:** \`${ping}\`ms
**WS пинг:** \`${Math.round(bot.ws.ping)}\`ms
**Использование CPU:** \`${await cpu.usage()}%\`
**Кол-во ядер:** \`${cpu.count()}\`
**Использование ОЗУ:** \`${usedMemMb.toFixed(0)}\`MB / \`${(totalMemMb).toFixed(0)}\`MB
**Версия Node.js:** \`${process.version}\`
**Версия Discord.js:** \`${version}\`
**Операционная система:** \`${await os.oos()} / ${os.arch()}\``)
        .addField('Репозиторий с говно-кодом', 'https://github.com/Xaliks/RudBot', true)
        .setFooter(`Аптайм: ${duration}`)
        .setThumbnail(bot.user.displayAvatarURL()));
    }
}