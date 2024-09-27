const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        const settingsPath = path.join(__dirname, '..', 'config', 'settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

        const logChannel = member.guild.channels.cache.get(settings.logChannelId);
        if (logChannel && member.kickable) {
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Izbačen Član')
                .setDescription(`${member.user.tag} je izbačen.`)
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
};
