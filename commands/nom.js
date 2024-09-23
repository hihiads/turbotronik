const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nom',
    description: 'Neko uživa u hrani!',
    execute(message, args) {
        // Pokušavamo dobiti spomenutog korisnika
        const target = message.mentions.users.first() || message.author;

        // URL za GIF
        const nomGifUrl = 'https://media.tenor.com/reDAhN2U0SsAAAPo/num-food.gif'; // Provjereni GIF URL

        // Kreiramo embed
        const nomEmbed = new MessageEmbed()
            .setDescription(`**${message.author.username}** uživa u hrani s **${target.username}!** 🍔`)
            .setColor('#FFCC00')
            .setImage(nomGifUrl);  // Postavljamo GIF

        // Slanje poruke s embed-om
        message.channel.send({ embeds: [nomEmbed] })
            .catch(err => {
                console.error('Greška pri slanju poruke:', err);
                message.reply('Došlo je do greške pri slanju poruke.');
            });
    },
};
