const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'topgghelp',
    description: 'Displays all available commands',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help Command - Available Commands')
            .setDescription('Here is a list of all available commands')
            .addFields(
                { name: 'AFK', value: '`afk` - Marks you as AFK (Away From Keyboard)', inline: true },
                { name: 'Avatar', value: '`avatar` - Displays your avatar or the avatar of a mentioned user', inline: true },
                { name: 'Ban', value: '`ban` - Bans a user from the server', inline: true },
                { name: 'Kick', value: '`kick` - Kicks a user from the server', inline: true },
                { name: 'Lock', value: '`lock` - Locks the current channel to prevent messages', inline: true },
                { name: 'Mute', value: '`mute` - Mutes a user on the server', inline: true },
                { name: 'Slowmode', value: '`slowmode` - Sets the slowmode interval in the channel', inline: true },
                { name: 'Softban', value: '`softban` - Softbans a user (ban and unban to delete their messages)', inline: true },
                { name: 'Tempban', value: '`tempban` - Temporarily bans a user for a specified time', inline: true },
                { name: 'Unban', value: '`unban` - Unbans a user from the server', inline: true },
                { name: 'Unmute', value: '`unmute` - Unmutes a previously muted user', inline: true },
                { name: 'Unlock', value: '`unlock` - Unlocks a previously locked channel', inline: true },
                { name: '8ball', value: '`8ball` - Answers your question with a random response', inline: true },
                { name: 'Weather', value: '`weather` - Displays weather information for a specified city', inline: true },
                { name: 'Button', value: '`button` - Creates an interactive button (test command)', inline: true }
            )
            .setFooter('Use . before each command to execute it, e.g., .afk');

        message.channel.send({ embeds: [embed] });
    },
};
