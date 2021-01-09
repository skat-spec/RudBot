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
const db = require('quick.db')
const {
    mem,
    cpu,
    os
} = require('node-os-utils');

module.exports = {
    name: 'stats',
    description: 'Статистика бота',
    aliases: ['инфо'],
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
<:CPU:756151041346764871>**Использование CPU:** \`${await cpu.usage()}%\`
**Кол-во ядер:** \`${cpu.count()}\`
<:RAM:751103280033038498>**Использование ОЗУ:** \`${usedMemMb.toFixed(0)}\`MB / \`${(totalMemMb).toFixed(0)}\`MB
<:nodejs:751109861239947264>**Версия Node.js:** \`${process.version}\`
<:djs:751109146903838780>**Версия Discord.js:** \`${version}\`
<:os:751122631905902642>**Операционная система:** \`${await os.oos()} / ${os.arch()}\``)
        .addField('Обратотка', `Обработано команд: \`${db.fetch('commands')}\`
Прочтено сообщений: \`${db.fetch('messages')}\``)
        .addField('Пригласить меня', `[Пригласить меня на свой сервер](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`)
        .addField('Репозиторий с говно-кодом', 'https://github.com/Xaliks/RudBot', true)
        .setFooter(`Аптайм: ${duration}`)
        .setThumbnail(bot.user.displayAvatarURL()));
    }
}