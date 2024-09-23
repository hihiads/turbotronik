module.exports = {
    name: 'lock',
    description: 'Zaključava kanal.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('Nemaš dozvolu za to!');

        const channel = message.channel;
        try {
            await channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: false });
            message.reply('Kanal je zaključan.');
        } catch (err) {
            message.reply('Ne mogu zaključati kanal.');
            console.error(err);
        }
    }
};
