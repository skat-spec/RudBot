const {
    MessageEmbed
} = require('discord.js')
const {
    error,
    timer
} = require('../../utils/functions')

module.exports = {
    name: "brawlstars",
    description: "Получить информацию о игроке из игры BrawlStars",
    args: true,
    usage: '<Тег игрока>',
    aliases: ['bs'],
    category: 'cmds',
    execute(message, args, bot) {
        bot.BS.getPlayer(args[0]).then((player) => {
            let PlayerName = player.name
            let PlayerTag = player.tag
            let PlayerTrophies = player.trophies
            let PlayerExplevel = player.expLevel
            let PlayerExppoints = player.expPoints
            let Player3vs3victories = player.x3vs3Victories
            let PlayerSolovictories = player.soloVictories
            let PlayerDuovictories = player.duoVictories
            if(!player.club.tag) message.channel.send(new MessageEmbed()
                .setTitle(PlayerName)
                .addField('Информация:', `Тег: \`${PlayerTag}\`
Трофеев: \`${PlayerTrophies}\`
Уровень (EXP): \`${PlayerExplevel}\` (**${timer(PlayerExppoints, ['поинт', 'поинта', 'поинтов'])}**)`, true)
                .addField('Победы', `Одиночных побед: \`${PlayerSolovictories}\`
Парных побед: \`${PlayerDuovictories}\`
Побед 3 на 3: \`${Player3vs3victories}\``, true))
            if(player.club.tag) {
                bot.BS.getClub(player.club.tag).then((club) => {
                    message.channel.send(new MessageEmbed()
                        .setTitle(PlayerName)
                        .addField('Информация:', `Тег: \`${PlayerTag}\`
Трофеев: \`${PlayerTrophies}\`
Уровень (EXP): \`${PlayerExplevel}\` (**${timer(PlayerExppoints, ['поинт', 'поинта', 'поинтов'])}**)`, true)
                        .addField('Победы', `Одиночных побед: \`${PlayerSolovictories}\`
Парных побед: \`${PlayerDuovictories}\`
Побед 3 на 3: \`${Player3vs3victories}\``, true)
                        .addField('Клуб', `Название: **${club.name}**
Тег: \`${club.tag}\`
Описание: **${club.description}**
Нужно трофеев для входа: \`${club.requiredTrophies}\`
Трофеев: \`${club.trophies}\``, true))
                }) // Конец поиска клуба
                return
            } // Конец "Если у игрока есть клуб"
        }).catch((err) => message.channel.send(error('Игрок не найден!'))); // Конец поиска по нику
    } // Execute
}; // mde