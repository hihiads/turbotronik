const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'logovi',
    description: 'Postavlja kanal za logove',
    async execute(client, message, args) {
        // Proveri da li korisnik menzionira kanal
        const channel = message.mentions.channels.first();
        if (!channel) {
            return message.reply('Molim te, označi kanal pomoću #kanal.');
        }

        const settingsPath = path.join(__dirname, '..', 'config', 'settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        settings.logChannelId = channel.id;

        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Log Kanal Postavljen')
            .setDescription(`Logovi će se slati u: ${channel}`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    },
};
