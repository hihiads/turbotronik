const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'naulji',
    description: 'Naulji korisnika!',
    execute(message, args) {
        const target = message.mentions.users.first();
        if (!target) {
            return message.reply('Molim te, spomeni korisnika kojeg želiš nauljiti!');
        }

        // URL direktnog GIF-a u .gif formatu
        const oilGifUrl = 'https://media.tenor.com/vpl3dt6KHOYAAAAd/bath-cleaning.gif';

        // Kreiramo embed s GIF-om
        const oilEmbed = new MessageEmbed()
            .setDescription(`**${message.author.username}** je nauljio **${target.username}!** 🛢️`)
            .setColor('#FFA500')
            .setImage(oilGifUrl);  // Postavljamo direktni .gif link

        // Slanje poruke s embed-om
        message.channel.send({ embeds: [oilEmbed] });
    },
};
