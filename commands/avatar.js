const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Prikaži profilnu sliku korisnika.',
    execute(message, args) {
        // Pokušavamo dobiti spomenutog korisnika
        const target = message.mentions.users.first() || message.author;

        // Kreiramo embed
        const avatarEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${target.username}'s Avatar`)
            .setImage(target.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setFooter('Profilna slika', target.displayAvatarURL({ dynamic: true }));

        // Slanje poruke s embed-om
        message.channel.send({ embeds: [avatarEmbed] })
            .catch(err => {
                console.error('Greška pri slanju poruke:', err);
                message.reply('Došlo je do greške pri slanju poruke.');
            });
    },
};
