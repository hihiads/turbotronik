const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ship',
    description: 'Spoji dva korisnika!',
    execute(message, args) {
        // Dobijamo sve spomenute korisnike
        const users = message.mentions.users;
        if (users.size < 2) {
            return message.reply('Molim te, spomeni dva korisnika koje želiš spojiti!');
        }

        // Odabir dva korisnika iz spomenutih
        const userArray = Array.from(users.values());
        const user1 = userArray[0];
        const user2 = userArray[1];

        // Generiramo nasumični postotak ljubavi
        const lovePercentage = Math.floor(Math.random() * 101); // Između 0 i 100

        // Kreiramo embed s profilnim slikama
        const shipEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .addField('\u200B', `**${user1.username}** ❤️ **${lovePercentage}%** ❤️ **${user2.username}**`)
            .setThumbnail(user1.displayAvatarURL({ dynamic: true }))
            .setImage(user2.displayAvatarURL({ dynamic: true }))
            .setFooter('Ajme meni kako su slatki!');

        // Slanje poruke s embed-om
        message.channel.send({ embeds: [shipEmbed] });
    },
};
