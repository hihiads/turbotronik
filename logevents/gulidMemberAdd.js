const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const settingsPath = path.join(__dirname, '..', 'config', 'settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

        const logChannel = member.guild.channels.cache.get(settings.logChannelId);
        if (logChannel) {
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Novi član')
                .setDescription(`${member.user.tag} se pridružio serveru.`)
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
};
