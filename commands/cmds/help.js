//Мой говно-код хелпа

const { MessageEmbed } = require('discord.js');
const { getServerPrefix, time } = require("../../utils/functions");

module.exports = {
   name: 'help',
   description: 'Помощь',
   aliases: ['хелп', 'помощь', 'h'],
   usage: '[команда]',
   category: 'cmds',
   execute(message, args) {
       let msgauthorid = message.author.id

       //дада, взято с модуля
    const paginationEmbed = async (msg, pages, emojiList = ['◀️', '▶️'], timeout = 100000) => {
        let page = 0;
        const curPage = await msg.channel.send(pages[page].setFooter(`Страница ${page + 1}/${pages.length}`));
        for (const emoji of emojiList) await curPage.react(emoji);
        const reactionCollector = curPage.createReactionCollector(
            (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
            { time: timeout }
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
        }});
        reactionCollector.on('end', () => curPage.reactions.removeAll());
        return curPage;
    };



    const { commands } = message.client;
    const prefix = getServerPrefix(message.guild.id)
    
    if (!args.length) {
    const Cmds = commands.filter(c => c.category === 'cmds').map(c => `${prefix}**${c.name}** ${c.usage || ''} - ${c.description}`).join(`\n`)
    const RP = commands.filter(c => c.category === 'rp').map(c => `${prefix}**${c.name}** ${c.usage || ''} - ${c.description}`).join(`\n`);
    const Info = commands.filter(c => c.category === 'info').map(c => `${prefix}**${c.name}** ${c.usage || ''} - ${c.description}`).join(`\n`);
    const Rep = commands.filter(c => c.category === 'Reputation').map(c => `${prefix}**${c.name}** ${c.usage || ''} - ${c.description}`).join(`\n`);
    let embed1 = new MessageEmbed();
    let embed2 = new MessageEmbed();
    let embed3 = new MessageEmbed();
    let embed4 = new MessageEmbed()
embeds = [
embed1.setTitle("Помощь по командам").setDescription(`**<> - Обязательное действие**\n**[] - Не обязательное действие**\n\n${Cmds}`).setAuthor("РудБот"),
embed2.setTitle('Помощь РП').setDescription(`**<> - Обязательное действие**\n**[] - Не обязательное действие**\n\n${RP}`).setAuthor("РудБот"),
embed3.setTitle('Помощь Инфо').setDescription(`**<> - Обязательное действие**\n**[] - Не обязательное действие**\n\n${Info}`).setAuthor("РудБот"),
embed4.setTitle('Помощь Репутация').setDescription(`**<> - Обязательное действие**\n**[] - Не обязательное действие**\n\n${Rep}`).setAuthor("РудБот"),
]

paginationEmbed(message, embeds);
        return}

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    if(command.admin) return;
    if (!command) {
        message.reply('Я не нашел эту команду!');
    return}

    const data = []
    if(command.aliases) data.push(`\n\n**Псевдоним(ы):** ${command.aliases.join(', ')}`)
    if(command.usage) data.push(`\n**Использование:** ${prefix}${command.name} ${command.usage}`)

    message.channel.send(new MessageEmbed()
    .setTitle(`Помощь`)
    .setDescription(`**Имя:** ${command.name}\n**Описание:** ${command.description}\n${data}\n\n**Кулдаун:**${time(command.cooldown * 1000 || 3000)}`)
    .setTimestamp());
    }
}
