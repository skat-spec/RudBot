const {
    MessageEmbed
} = require("discord.js");
const {
    formatDate,
    error
} = require('../../utils/functions')
const fetch = require("node-fetch");

module.exports = {
    name: "covid",
    description: "Информация о коронавирусе",
    usage: '[Страна]',
    category: 'info',
    aliases: ['ковид'],
    async execute(message, args) {
        let country = args.join(' ')
        let data = await fetch("https://disease.sh/v3/covid-19/countries/" + encodeURIComponent(country)).then(res => res.json());
        if(!country) data = await fetch("https://disease.sh/v3/covid-19/all").then(res => res.json());
        if(data.message) return message.channel.send(error('Страна не найдена!'))

        message.channel.send(`Обновление было ${formatDate(new Date(data.updated))}`, new MessageEmbed()
            .setTitle(data.country || 'Коронавирус')
            .setDescription(`Заражений: \`${formatNumber(data.cases)}\`
Заражений за сегодня: \`${formatNumber(data.todayCases)}\`

Сметртей: \`${formatNumber(data.deaths)}\`
Смертей за сегодня: \`${formatNumber(data.todayDeaths)}\`

Выздоровело: \`${formatNumber(data.recovered)}\`
Выздоровело за сегодня: \`${formatNumber(data.todayRecovered)}\`

Болеет: \`${formatNumber(data.active)}\`
Смертей: \`${formatNumber(data.deaths)}\`
В критическом состоянии: \`${formatNumber(data.critical)}\`
Сделано тестов: \`${formatNumber(data.tests)}\``)
            .setThumbnail(`${data.countryInfo?.flag || 'https://storage.myseldon.com/news_pict_CD/CDC0F8531BA1D162DE098B176BB260C1'}`)
        );
    }
};

function formatNumber(n) {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}