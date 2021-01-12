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
const {
    emoji
} = require('../../data/emojis.json')

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
        const ping = Date.now() - message.createdTimestamp
        const duration = time(bot.uptime)
        const createdAt = formatDate(bot.user.createdAt);
        const servers = bot.guilds.cache.size
        const users = bot.users.cache.size
        const call = bot.channels.cache.size
        const categories = ChannelSize(bot, 'category')
        const voice = ChannelSize(bot, 'voice')
        const text = ChannelSize(bot, 'text')

        message.channel.send(new MessageEmbed()
        .setTitle('Инфо')
        .setDescription(`**Создатель:** \`${bot.users.cache.get(Xaliks).tag}\`
**Создан:** \`${createdAt}\`

**Кол-во команд:** \`${bot.commands.filter(cmd => !cmd.admin).size}\`
:bust_in_silhouette: **Пользователей:** \`${users}\`
**Серверов:** \`${servers}\`
**Каналов ${call}**: Категорий / Текст. / Гол.  
**${categories} / ${text} / ${voice}**

**Ответ на команды:** \`${ping}\`ms
**WS пинг:** \`${Math.round(bot.ws.ping)}\`ms
${emoji.CPU}**Использование CPU:** \`${await cpu.usage()}%\`
**Кол-во ядер:** \`${cpu.count()}\`
${emoji.RAM}**Использование ОЗУ:** \`${usedMemMb.toFixed(0)}\`MB / \`${(totalMemMb).toFixed(0)}\`MB
${emoji.NodeJS}**Версия Node.js:** \`${process.version}\`
${emoji.DiscordJS}**Версия Discord.js:** \`${version}\`
${emoji.Linux}**Операционная система:** \`${await os.oos()} / ${os.arch()}\``)
        .addField('Пригласить меня', `[Пригласить меня на свой сервер](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`)
        .addField('Репозиторий', 'https://github.com/Xaliks/RudBot', true)
        .setFooter(`Аптайм: ${duration}`)
        .setThumbnail(bot.user.displayAvatarURL()));
    }
}

function ChannelSize(bot, ChannelType) {
    return bot.channels.cache.filter(c => c.type === ChannelType).size
}