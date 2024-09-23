module.exports = {
    name: 'ban',
    description: 'Banovanje člana sa servera.',
    async execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('Nemaš dozvolu za to!');

        const member = message.mentions.members.first();
        if (!member) return message.reply('Moraš označiti člana kojeg želiš banovati.');

        try {
            await member.ban();
            message.reply(`${member.user.tag} je banovan.`);
        } catch (err) {
            message.reply('Ne mogu banovati ovog člana.');
            console.error(err);
        }
    }
};
