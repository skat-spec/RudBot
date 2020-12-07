const { MessageEmbed, version } = require("discord.js");
const { formatDate, time } = require("../../utils/functions");
const { Xaliks } = require('../../config.json')
const cpuStat = require("cpu-stat")
require('moment-duration-format');

module.exports = {
    name: 'stats',
    description: 'Статистика бота',
    aliases: ['инфо'],
    usage: '',
    category: 'info',
    execute(message, args, bot) {
    var ping = Date.now() - message.createdTimestamp
    const duration = time(bot.uptime)
var os = require('os');
let createdAt = formatDate(bot.user.createdAt);
cpuStat.usagePercent(function(err, percent, seconds) {

const embed = new MessageEmbed()
.setColor("303136")
.setTitle('Инфо') 
.setDescription(`
    **Создатель:** \`${bot.users.cache.get(Xaliks).tag}\`
    **Создан:** \`${createdAt}\`

    **Кол-во команд:** \`${bot.commands.size - bot.commands.filter(cmd => cmd.admin).size - bot.commands.filter(cmd => cmd.category === 'nsfw').size}\`
    :bust_in_silhouette: Пользователей: ${bot.users.cache.size}
    **Каналов ${bot.channels.cache.size}**: Категорий / Текст. / Гол.  
    **${bot.channels.cache.filter(c => c.type === 'category').size} / ${bot.channels.cache.filter(c => c.type === 'text').size} / ${bot.channels.cache.filter(c => c.type === 'voice').size}**

    **Мой пинг:** \`${ping}\`ms
    **Discord API:** \`${bot.ws.ping}\`ms
    **Использование CPU:** \`${percent.toFixed(2)}%\`
    **Использование ОЗУ:** \`${(
        process.memoryUsage().heapUsed /
        1024 /
        1024
    ).toFixed(2)}\`MB / \`${(os.totalmem()/ Math.pow(1024, 3)).toFixed(2)}\`GB 
    **Версия Node.js:** \`${process.version}\`
    **Версия Discord.js:** \`${version}\`
    **Операционная система:** \`${os.type()} / ${os.arch()}\``
)
.addField('Репозиторий с говно-кодом', '[GitHub](https://github.com/Xaliks/RudBot)', true)
.setFooter(`Аптайм: ${duration}`)
.setThumbnail(bot.user.displayAvatarURL())


message.channel.send(embed);
})
    }
}
