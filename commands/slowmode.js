module.exports = {
    name: 'slowmode',
    description: 'Postavlja slowmode za kanal.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('Nemaš dozvolu za to!');

        const seconds = parseInt(args[0]);
        if (isNaN(seconds) || seconds < 0) return message.reply('Moraš navesti validan broj sekundi.');

        try {
            await message.channel.setRateLimitPerUser(seconds);
            message.reply(`Slowmode je postavljen na ${seconds} sekundi.`);
        } catch (err) {
            message.reply('Ne mogu postaviti slowmode.');
            console.error(err);
        }
    }
};
