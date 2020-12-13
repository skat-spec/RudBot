const {
  addBlacklistUser,
  getBlacklistUsers,
  setBlacklistUsers,
} = require("../../utils/functions");
const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "blacklist",
  category: "botowner",
  aliases: ['чс', '4c'],
  admin: true,
  async execute(message, args, bot) {
      const levels = ["1", "2"];
      const type = args[0];
      const level = args[1];
      const user =
          bot.users.cache.find((user) => user.id === args[2]) ||
          message.mentions.users.first();

      if(!args[0]) {
          return message.channel.send("<тип (add/remove/view)> <уровень (хз зач)> <юзер/ID>");
      }

      const users = await getBlacklistUsers();

      switch (type) {
          case "view":
              const usr =
                  users !== null && users.filter((u) => u.user?.id === user.id)[0];

              if(!usr) {
                  return message.channel.send("Не в ЧС");
              }

              const embed = new MessageEmbed()
                  .setTitle(`Статус: ${usr.user.username}`)
                  .setTimestamp()
                  .addField("Лвл", usr.level ? usr.level : "0");

              return message.channel.send({
                  embed
              });
          case "add":
              if(!levels.includes(level)) {
                  return message.channel.send("может быть онли **1** or **2**");
              }
              if(users === null) {
                  return setBlacklistUsers([user]);
              }
              const existing =
                  users !== null && users.filter((u) => u.user?.id === user.id)[0];
              if(existing) {
                  return message.channel.send(`${user.tag} уже в ЧС`);
              }

              addBlacklistUser({
                  user,
                  level
              });
              break;
          case "remove":
              if(users === null) {
                  return message.channel.send(`${user.tag} не в ЧС`);
              }
              const exists = getBlacklistUsers()?.filter(
                  (u) => u.user?.id === user?.id
              )[0];
              if(!exists) {
                  return message.channel.send(`${user.tag} не в ЧС`);
              }
              const blacklisted = getBlacklistUsers().filter(
                  (u) => u.user?.id !== user?.id
              );
              setBlacklistUsers(blacklisted);
              break;
          default: {
              return message.channel.send(`**${type}** не add/remove/view`);
          }
      }
      return message.channel.send(
          `${user.tag} ${type === "add" ? "ушел в ЧС" : "больше не в ЧС"}`
      );
  },
};