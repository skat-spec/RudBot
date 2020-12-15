const {
    addBlacklistUser,
    getBlacklistUsers,
    setBlacklistUsers,
    error
} = require("../../utils/functions");
const {
    Xaliks
} = require('../../config.json')

module.exports = {
    name: "blacklist",
    category: "botowner",
    usage: ['<add/view/remove> <ID>'],
    args: true,
    aliases: ['чс', '4c'],
    async execute(message, args, bot) {
        if(message.author.id != Xaliks && message.author.id != '637309157997019136') return;
        const type = args[0];
        const reason = args.slice(2).join(' ')
        const user =
            bot.users.cache.find((user) => user.id === args[1]) ||
            message.mentions.users.first();

        if(!type) return message.channel.send("add/remove/view");

        if(!user) return message.channel.send("Ну да ну да... а кого в чс кидать то будем?")

        if(!args[2] && type === 'add') return message.channel.send("А причину кто писать будет?");

        if(user?.id === Xaliks && type === 'add') return message.channel.send(error('Ты че, попутал?'))

        const users = await getBlacklistUsers();

        switch (type) {
            case "view":
                const usr =
                    users !== null && users.filter((u) => u.user?.id === user.id)[0];

                if(!usr) {
                    return message.channel.send("Не в ЧС");
                }

                return message.channel.send(`В чс по причине: **${users?.filter(
                    (u) => u.user?.id === user?.id
                )[0].reason}**`);
            case "add":
                if(users === null) return setBlacklistUsers([user]);

                const existing =
                    users !== null && users.filter((u) => u.user?.id === user.id)[0];

                if(existing) return message.channel.send(`${user.tag} уже в ЧС по причине: **${users?.filter(
                    (u) => u.user?.id === user?.id
                )[0].reason}**`);

                addBlacklistUser({
                    user,
                    reason
                });
                break;
            case "remove":
                if(users === null) {
                    return message.channel.send(`${user.tag} не в ЧС`);
                }
                const exists = users?.filter(
                    (u) => u.user?.id === user?.id
                )[0];
                if(!exists) {
                    return message.channel.send(`${user.tag} не в ЧС`);
                }
                const blacklisted = users?.filter(
                    (u) => u.user?.id !== user?.id
                );
                setBlacklistUsers(blacklisted);
                break;
            default: {
                return message.channel.send(`**${type}** не add/remove/view`);
            }
        }
        return message.channel.send(
            `${user.tag} ${type === "add" ? `ушел в ЧС по причине: **${reason}**` : "больше не в ЧС"}`
        );
    },
};