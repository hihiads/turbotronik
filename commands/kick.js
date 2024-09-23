module.exports = {
    name: 'kick',
    description: 'Izbacuje člana sa servera.',
    async execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('Nemaš dozvolu za to!');
        
        const member = message.mentions.members.first();
        if (!member) return message.reply('Moraš označiti člana kojeg želiš izbaciti.');

        try {
            await member.kick();
            message.reply(`${member.user.tag} je izbačen.`);
        } catch (err) {
            message.reply('Ne mogu izbaciti ovog člana.');
            console.error(err);
        }
    }
};
