const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kiss',
    description: 'Poljubi korisnika!',
    execute(message, args) {
        const target = message.mentions.users.first();
        if (!target) {
            return message.reply('Molim te, spomeni korisnika kojeg želiš poljubiti!');
        }

        // Niz GIF-ova za poljubac
        const kissGifs = [
            'https://media.tenor.com/qrwHliL3sFgAAAAC/i-wanna-kiss-you-all-the-time.gif', // Ovaj koji si dao
            'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif', // Još jedan poljubac GIF
            'https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif', // Drugi GIF za poljubac
            'https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif', // Još jedan
            'https://media.tenor.com/vXAGxP1n8lMAAAAC/cute-kiss.gif', // Slatki poljubac GIF
            'https://media.tenor.com/nD8K0GywGSYAAAAC/forehead-kiss-love.gif' // Poljubac u čelo
        ];

        // Nasumično biramo jedan GIF iz niza
        const randomGif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

        // Kreiramo embed s odabranim GIF-om
        const kissEmbed = new MessageEmbed()
            .setDescription(`**${message.author.username}** je poljubio/la **${target.username}!** 😘`)
            .setColor('#FF69B4')
            .setImage(randomGif);  // Postavljamo nasumično odabrani GIF

        // Slanje poruke s embed-om
        message.channel.send({ embeds: [kissEmbed] });
    },
};
