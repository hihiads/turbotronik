module.exports = {
    name: 'mute',
    description: 'Mute-uje člana na serveru.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply('Nemaš dozvolu za to!');

        const member = message.mentions.members.first();
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) return message.reply('Nema role "Muted".');

        if (!member) return message.reply('Moraš označiti člana kojeg želiš mute-ovati.');

        try {
            await member.roles.add(muteRole);
            message.reply(`${member.user.tag} je mute-ovan.`);
        } catch (err) {
            message.reply('Ne mogu mute-ovati ovog člana. ');
            console.error(err);
        }
    }
};
