module.exports = {
    name: 'unlock',
    description: 'Otključava kanal.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('Nemaš dozvolu za to!');

        const channel = message.channel;
        try {
            await channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true });
            message.reply('Kanal je otključan.');
        } catch (err) {
            message.reply('Ne mogu otključati kanal.');
            console.error(err);
        }
    }
};
