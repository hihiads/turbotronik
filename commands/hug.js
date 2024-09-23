const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'hug',
    description: 'Zagrli korisnika!',
    execute(message, args) {
        const target = message.mentions.users.first();
        if (!target) {
            return message.reply('Molim te, spomeni korisnika kojeg želiš zagrliti!');
        }

        const hugGifs = [
            'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
            'https://media.giphy.com/media/143v0Z4767T15e/giphy.gif',
            'https://media.giphy.com/media/sUIZWMnfd4Mb6/giphy.gif',
        ];

        const randomGif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

        const hugEmbed = new MessageEmbed()
            .setDescription(`**${message.author.username}** grli **${target.username}!** 🤗`)
            .setImage(randomGif)
            .setColor('#FFC0CB');

        message.channel.send({ embeds: [hugEmbed] });
    },
};
