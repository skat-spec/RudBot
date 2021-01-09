const {
    MessageEmbed
} = require('discord.js');
const {
    error,
    time
} = require("../../utils/functions");

module.exports = {
    name: 'help',
    description: 'Помощь',
    aliases: ['хелп', 'помощь', 'h'],
    usage: '[команда]',
    category: 'cmds',
    async execute(message, args) {
        const {
            client,
            guild,
            channel,
            author
        } = message;
        let {
            commands
        } = client
        const prefix = await guild.prefix
        const paginationEmbed = async (msg, pages, emojiList = ['◀️', '⏹️', '▶️']) => {
            let page = 0;
            const curPage = await msg.channel.send(pages[page].setFooter(`Страница ${page + 1}/${pages.length}`));
            for(const emoji of emojiList) await curPage.react(emoji);
            const reactionCollector = curPage.createReactionCollector(
                (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot, {
                    time: 100000
                }
            );
            reactionCollector.on('collect', (reaction, user) => {
                if(user.id != author.id) reaction.users.remove(user.id);
                else {
                    reaction.users.remove(msg.author);
                    switch (reaction.emoji.name) {
                        case emojiList[0]:
                            page = page > 0 ? --page : pages.length - 1;
                            break;
                        case emojiList[1]:
                            reaction.message.delete();
                            break;
                        case emojiList[2]:
                            page = page + 1 < pages.length ? ++page : 0;
                            break;
                        default:
                            break;
                    }
                    curPage.edit(pages[page].setFooter(`Страница ${page + 1}/${pages.length}`));
                }
            });
            reactionCollector.on('end', () => curPage.reactions.removeAll());
            return curPage;
        };

        if(!args[0]) {
            embeds = [
                Embeds("Настройка", "settings"),
                Embeds("Команды", "cmds"),
                Embeds("РП", "rp"),
                Embeds("Инфо", "info"),
                Embeds("Репутация", "Reputation"),
                Embeds("Музыка", "music"),
                Embeds("Свадьбы", "Marry")
            ]

            paginationEmbed(message, embeds);

            if(guild.id === '681142809654591501') {
                channel.send(Embeds("ТБР", "TBR"))
            }
            return
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if(command.admin) return;
        if(!command) return channel.send(error('Я не нашел эту команду!'));

        const data = []
        if(command.aliases) data.push(`\n\n**Псевдоним(ы):** ${command.aliases.join(', ')}`)
        if(command.usage) data.push(`\n**Использование:** ${prefix}${command.name} ${command.usage}`)

        channel.send(new MessageEmbed()
            .setTitle(`Помощь`)
            .setDescription(`**Имя:** ${command.name}\n**Описание:** ${command.description}\n${data}\n\n**Кулдаун:** ${time(command.cooldown * 1000 || 3000)}`)
            .setTimestamp());

        function Embeds(Title, category) {
            return new MessageEmbed()
                .setAuthor("РудБот")
                .setTitle(`Помощь **${Title}**`)
                .setDescription(`**<> - Обязательное действие**
**[] - Не обязательное действие**

${commands
    .filter(c => c.category === category)
    .map(c => `${prefix}**${c.name}** ${c.usage || ''} - ${c.description}`)
    .join(`\n`)}`)
        }
    }
}