const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageDeleteBulk',
    execute(messages) {
        const settingsPath = path.join(__dirname, '..', 'config', 'settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

        const logChannel = messages.first().guild.channels.cache.get(settings.logChannelId);
        if (logChannel) {
            const embed = new MessageEmbed()
                .setColor('#FFA500')
                .setTitle('Masovno Brisanje Poruka')
                .setDescription(`${messages.size} poruka je obrisano.`)
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
};
