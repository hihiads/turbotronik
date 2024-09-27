const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildBanRemove',
    execute(ban) {
        const settingsPath = path.join(__dirname, '..', 'config', 'settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

        const logChannel = ban.guild.channels.cache.get(settings.logChannelId);
        if (logChannel) {
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Unbanovan Korisnik')
                .setDescription(`${ban.user.tag} je unbanovan.`)
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
};
