module.exports = {
    name: "error",
    async execute(bot, error, message) {
        if(error === "UnableToJoin") message.channel.send('Произошла ошибка');
        else message.channel.send('Произошла ошибка');
    },
};