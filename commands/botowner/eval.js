//Украдено у Freedom)

const { Discord, MessageEmbed, MessageAttachment } = require('discord.js')
const { openWeatherMapKey, emoji } = require('../../config.json')
const { time, timer, formatDate } = require('../../utils/functions')
const ms = require('ms')
const fetch = require('node-fetch')

module.exports = {
    name: 'eval',
    description: 'Eval',
    admin: true,
    usage: '<команда>',
    category: 'botowner',
    aliases: ['e', 'ebal', 'евал'],
    admin: true,
    async execute(message, args, bot) {
        let tyyype = {
        "Undefined": "Неопределенный",
        "Boolean": "Логический",
        "Number": "Число",
        "String": "Строка",
        "Object": "Объект" 
      } 
      const msg = await message.channel.send(new MessageEmbed() 
      .setDescription('Отправляю...')) 
   
      try { 
        let evaled = eval(args.join(' ')); 
        if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled 
    let eevaled = typeof evaled;  
     evaled = require('util').inspect(evaled, { depth: 0, maxArrayLength: null }) 
    const tyype = eevaled[0].toUpperCase() + eevaled.slice(1)  
   
    msg.edit(new MessageEmbed() 
    .setTitle('Eval') 
    .setDescription(`**Успешно ${emoji.yes}** 
**Тип:** \`${tyyype[tyype]}\`
**Готово за:** \`${new Date().getTime() - message.createdTimestamp + 'ms'}\` 
**Вход:**\`\`\`js\n${args.join(' ')} \`\`\`\n**Выход:**\`\`\`js\n${evaled}\n\`\`\``)) 
    } catch(err) { 
    msg.edit(new MessageEmbed() 
    .setTitle(`Eval`) 
    .setDescription(`Ошибка ${emoji.error} 
\n\`\`\`${err.stack}\`\`\``)) 
        }
    }
};
