const {
    resServerRep,
    yes,
    error
} = require('../../utils/functions')
const db = require("quick.db");

module.exports = {
    name: 'reset-rep',
    description: 'Обнулить рeпутацию на сервере',
    category: 'Reputation',
    aliases: ['resetrep'],
    async execute(message) {
        const filter = (m) => message.author.id === m.author.id;
        const data = db
            .fetchAll()
            .filter((da) => da.ID.startsWith(`rep_${message.guild.id}_`))
            .sort((a, b) => b.data - a.data)

        if(!message.member.permissions.has(["MANAGE_MESSAGES"])) return message.channel.send(error('У вас нет прав! (Управлять сообщениями)'))
        if(data[0].data === '0' || data[0].data === null) return message.channel.send(error('На сервере никто не получил репутацию!'))

        message.channel.send('Вы уверены что хотите это сделать? **Да/Нет** (У вас есть 15 секунд)')

        message.channel
            .awaitMessages(filter, {
                time: 15000,
                max: 1,
                errors: ["time"],
            })
            .then(async (msgs) => {
                const msg = msgs.first();
                if(["y", "yes", "д", "да"].includes(msg.content.toLowerCase())) {

                    resServerRep(message.guild.id)
                    message.channel.send(yes('Репутация была полностью сброшена!'));
                } else {
                    message.channel.send('Ну нет, так нет.');
                }
            })
    },
}