const { ShardingManager } = require('discord.js');
const { token } = require('./config.json')
const manager = new ShardingManager('./bot.js', {
    // https://discord.js.org/#/docs/main/v12/class/ShardingManager
    token: token
});

manager.spawn();

manager.on('shardCreate', (shard) => console.log(`[DISCORD] Шард ${shard.id} запущен!`));
