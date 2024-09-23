module.exports = {
    name: 'unban',
    description: 'Unban-uje člana sa servera.',
    async execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('Nemaš dozvolu za to!');

        const userId = args[0];
        if (!userId) return message.reply('Moraš navesti ID korisnika kojeg želiš unbanovati.');

        try {
            await message.guild.members.unban(userId);
            message.reply(`Korisnik sa ID-em ${userId} je odbanovan.`);
        } catch (err) {
            message.reply('Ne mogu unbanovati ovog korisnika.');
            console.error(err);
        }
    }
};
