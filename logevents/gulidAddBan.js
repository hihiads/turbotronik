const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildBanAdd',
    execute(ban) {
        const settingsPath = path.join(__dirname, '..', 'config', 'settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

        const logChannel = ban.guild.channels.cache.get(settings.logChannelId);
        if (logChannel) {
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Banovan Korisnik')
                .setDescription(`${ban.user.tag} je banovan.`)
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
};
