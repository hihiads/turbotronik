const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember) {
        const settingsPath = path.join(__dirname, '..', 'config', 'settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

        const logChannel = newMember.guild.channels.cache.get(settings.logChannelId);
        if (logChannel) {
            const oldRoles = oldMember.roles.cache.map(role => role.name);
            const newRoles = newMember.roles.cache.map(role => role.name);
            const addedRoles = newRoles.filter(role => !oldRoles.includes(role));
            const removedRoles = oldRoles.filter(role => !newRoles.includes(role));

            const embed = new MessageEmbed()
                .setColor('#0099FF')
                .setTitle('Promjena Uloga')
                .setTimestamp();

            if (addedRoles.length) {
                embed.addField('Dodani Ulozi', addedRoles.join(', '));
            }

            if (removedRoles.length) {
                embed.addField('Uklonjeni Ulozi', removedRoles.join(', '));
            }

            logChannel.send({ embeds: [embed] });
        }
    },
};
