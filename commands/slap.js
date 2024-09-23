const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slap',
    description: 'Ošamari korisnika!',
    execute(message, args) {
        const target = message.mentions.users.first();
        if (!target) {
            return message.reply('Molim te, spomeni korisnika kojeg želiš ošamariti!');
        }

        // Niz GIF-ova za slap
        const slapGifs = [
            'https://media.tenor.com/VD5cKoGiGpkAAAAC/orange-cat-cat-hitting.gif', // Ovaj koji si poslao
            'https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif', // Klasični šamar
            'https://media.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif', // Animirani slap
            'https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif', // Polagani slap
            'https://media.giphy.com/media/RXGNsyRb1hDJm/giphy.gif', // Smiješni slap s pingvinom
            'https://media.tenor.com/PgIHySOQ2CwAAAAC/slap-tom-and-jerry.gif' // Tom i Jerry slap
        ];

        // Nasumično biramo jedan GIF iz niza
        const randomGif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

        // Kreiramo embed s odabranim GIF-om
        const slapEmbed = new MessageEmbed()
            .setDescription(`**${message.author.username}** je ošamario **${target.username}!** 👋`)
            .setColor('#FF4500')
            .setImage(randomGif);  // Postavljamo nasumično odabrani GIF

        // Slanje poruke s embed-om
        message.channel.send({ embeds: [slapEmbed] });
    },
};
