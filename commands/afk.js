const afkUsers = new Map();

module.exports = {
    name: 'afk',
    description: 'Postavi se kao AFK s porukom.',
    execute: async (message, args) => {
        const userId = message.author.id;
        const guildMember = message.guild.members.cache.get(userId); // Dohvatamo korisnikov guild member

        // Provjeravamo je li korisnik već AFK
        if (afkUsers.has(userId)) {
            const afkData = afkUsers.get(userId);
            const afkDuration = Math.floor((Date.now() - afkData.timestamp) / 60000); // AFK trajanje u minutama
            afkUsers.delete(userId); // Uklanjamo korisnika iz AFK stanja

            // Vraćamo originalno korisničko ime
            if (guildMember && guildMember.nickname && guildMember.nickname.startsWith('[AFK]')) {
                await guildMember.setNickname(guildMember.nickname.replace('[AFK] ', ''));
            }

            return message.reply(`Vraćaš se, nisi više AFK! Bio si AFK ${afkDuration} minuta.`);
        }

        // Postavljamo AFK stanje s porukom
        const afkMessage = args.join(' ') || 'Nema poruke'; // Ako nema poruke, koristimo zadanu
        afkUsers.set(userId, {
            message: afkMessage,
            timestamp: Date.now(), // Čuvamo vreme kada je korisnik postao AFK
            originalNickname: guildMember ? guildMember.nickname : null, // Čuvamo originalno korisničko ime
            lastMessageId: message.id // Čuvamo ID poruke kojom je postavljen AFK status
        });

        // Postavljamo AFK oznaku u korisničko ime
        if (guildMember && (!guildMember.nickname || !guildMember.nickname.startsWith('[AFK]'))) {
            await guildMember.setNickname(`[AFK] ${guildMember.nickname || message.author.username}`);
        }

        message.reply(`Postavljen si kao AFK: "${afkMessage}"`);
    },
    afkUsers, // Izlažemo mapu AFK korisnika
};
