const {
  MessageAttachment
} = require("discord.js");

module.exports = {
  name: "captcha",
  description: "Капча",
  aliases: ['капча'],
  args: true,
  usage: '<Текст>',
  category: "cmds",
  async execute(message, args, bot) {
      const image = await bot.alexClient.image.captcha({
          text: args.join(" "),
      });

      message.channel.send(new MessageAttachment(image, "captcha.png"));
  },
};