const {
    MessageEmbed
} = require('discord.js');
const {
    getServerPrefix,
    time
} = require("../../utils/functions");
let embed0 = new MessageEmbed().setAuthor("РудБот");
let embed1 = new MessageEmbed().setAuthor("РудБот");
let embed2 = new MessageEmbed().setAuthor("РудБот");
let embed3 = new MessageEmbed().setAuthor("РудБот");
let embed4 = new MessageEmbed().setAuthor("РудБот");
let embed5 = new MessageEmbed().setAuthor("РудБот");
const nado = '**<> - Обязательное действие**\n**[] - Не обязательное действие**\n\n'

module.exports = {
    name: 'help',
    description: 'Помощь',
    aliases: ['хелп', 'помощь', 'h'],
    usage: '[команда]',
    category: 'cmds',
    async execute(message, args) {
        let msgauthorid = message.author.id
        const {
            commands
        } = message.client;
        const prefix = await getServerPrefix(message.guild.id)
        const paginationEmbed = async (msg, pages, emojiList = ['◀️', '▶️'], timeout = 100000) => {
            let page = 0;
            const curPage = await msg.channel.send(pages[page].setFooter(`Страница ${page + 1}/${pages.length}`));
            for(const emoji of emojiList) await curPage.react(emoji);
            const reactionCollector = curPage.createReactionCollector(
                (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot, {
                    time: timeout
                }
            );
            reactionCollector.on('collect', (reaction, user) => {
                if(user.id != msgauthorid) reaction.users.remove(user.id);
                else {
                    reaction.users.remove(msg.author);
                    switch (reaction.emoji.name) {
                        case emojiList[0]:
                            page = page > 0 ? --page : pages.length - 1;
                            break;
                        case emojiList[1]:
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

        if(!args.length) {
            const Commands = function(category) {
                return nado + commands.filter(c => c.category === category).map(c => `${prefix}**${c.name}** ${c.usage || ''} - ${c.description}`).join(`\n`)
            }
            embeds = [
                embed0.setTitle("Помощь по настройке").setDescription(Commands('settings')),
                embed1.setTitle("Помощь по командам").setDescription(Commands('cmds')),
                embed2.setTitle('Помощь РП').setDescription(Commands('RP')),
                embed3.setTitle('Помощь Инфо').setDescription(Commands('info')),
                embed4.setTitle('Помощь Репутация').setDescription(Commands('Reputation')),
                embed5.setTitle('Помощь Музыка').setDescription(Commands('music'))
            ]

            paginationEmbed(message, embeds);

            if(message.guild.id === '681142809654591501') {
                message.channel.send(new MessageEmbed()
                    .setTitle('Помощь Тут Бывает Руда')
                    .setDescription(Commands('TBR'))
                    .setAuthor("РудБот"))
            }
            return
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if(command.admin) return;
        if(!command) return message.reply('Я не нашел эту команду!');

        const data = []
        if(command.aliases) data.push(`\n\n**Псевдоним(ы):** ${command.aliases.join(', ')}`)
        if(command.usage) data.push(`\n**Использование:** ${prefix}${command.name} ${command.usage}`)

        message.channel.send(new MessageEmbed()
            .setTitle(`Помощь`)
            .setDescription(`**Имя:** ${command.name}\n**Описание:** ${command.description}\n${data}\n\n**Кулдаун:**${time(command.cooldown * 1000 || 3000)}`)
            .setTimestamp());
    }
}