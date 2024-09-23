module.exports = {
    name: 'unmute',
    description: 'Uklanja mute sa člana.',
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply('Nemaš dozvolu za to!');

        const member = message.mentions.members.first();
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) return message.reply('Nema role "Muted".');

        if (!member) return message.reply('Moraš označiti člana kojem želiš ukloniti mute.');

        try {
            await member.roles.remove(muteRole);
            message.reply(`${member.user.tag} više nije mute-ovan.`);
        } catch (err) {
            message.reply('Ne mogu ukloniti mute sa ovog člana.');
            console.error(err);
        }
    }
};
