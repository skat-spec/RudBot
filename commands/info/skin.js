const { MessageEmbed } = require("discord.js");
const { error } = require('../../utils/functions');
const fetch = require('node-fetch');

module.exports = {
  name: "skin",
  description: "Поиск скинов из Minecraft",
  category: "info",
  usage: '<Ник игрока>',
  args: true,
  async execute(message, args) {
  function isCyrillic(str) {
    return /[a-z]/i.test(str);
  };
  function isNumber(str) {
    return /[0-9]/i.test(str);
  };
  const msg = await message.channel.send('Поиск...')
  const uuuid = await fetch(`https://playerdb.co/api/player/minecraft/${args[0]}`).then(res => res.json());
  if(!isCyrillic(args) && !isNumber(args) || !uuuid.success || uuuid?.error) return msg.edit('', error(`Игрок \`${args.join(' ')}\` не найден!`));
  const uuid = uuuid.data.player;
  const full = `https://visage.surgeplay.com/full/2048/${uuid.id}.png`;
  const skin = `https://visage.surgeplay.com/skin/2048/${uuid.id}.png`;
  const face = uuid.avatar;
  msg.edit('', new MessageEmbed()
    .setAuthor(`Скин игрока ${uuid.username}`, face)
    .setDescription(`[Скачать скин](${skin})`)
    .setImage(full));
  },
};

// const{MessageEmbed}=require("discord.js");const{error}=require('../../utils/functions');const fetch=require('node-fetch');module.exports={name:"skin",description:"Поиск скинов из Minecraft",category:"info",usage:'<Ник игрока>',args:true,async execute(message,args){function isCyrillic(str){return/[a-z]/i.test(str)};function isNumber(str){return/[0-9]/i.test(str)};const uuuid = await fetch(`https://playerdb.co/api/player/minecraft/${args[0]}`).then(res => res.json());if(!isCyrillic(args)&&!isNumber(args)||!uuuid.success||uuuid?.error)return message.channel.send(error(`Игрок \`${args.join(' ')}\` не найден!`));const uuid=uuuid.data.player;const full=`https://visage.surgeplay.com/full/2048/${uuid.id}.png`;const skin=`https://visage.surgeplay.com/skin/2048/${uuid.id}.png`;const face = uuid.avatar;message.channel.send(new MessageEmbed().setAuthor(`Скин игрока ${uuid.username}`, face).setDescription(`[Скачать скин](${skin})`).setImage(full));},};