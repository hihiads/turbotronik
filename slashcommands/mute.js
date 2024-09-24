const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute') // Ime komande
        .setDescription('Nijemi korisnika na serveru.') // Opis komande
        .addUserOption(option =>
            option.setName('user') // Ne prevodimo ime opcije
                .setDescription('Korisnik kojeg treba nijemiti') // Opis opcije
                .setRequired(true)), // Obavezna opcija

    async execute(interaction) {
        const user = interaction.options.getUser('user'); // Dohvati korisnika iz opcije
        const member = await interaction.guild.members.fetch(user.id); // Dohvati člana iz servera

        // Potraži ulogu "Muted"
        let mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (!mutedRole) {
            // Ako uloga ne postoji, kreiraj je
            mutedRole = await interaction.guild.roles.create({
                name: 'Muted',
                permissions: [],
            });

            // Onemogući slanje poruka i govor u svim kanalima za ulogu "Muted"
            interaction.guild.channels.cache.forEach(async (channel) => {
                await channel.permissionOverwrites.create(mutedRole, {
                    SEND_MESSAGES: false,
                    SPEAK: false,
                });
            });
        }

        try {
            await member.roles.add(mutedRole); // Dodaj ulogu "Muted" korisniku
            await interaction.reply(`Nijemljen **${user.tag}**.`); // Potvrda nijemljenja
            await user.send(`Nijemljeni ste na **${interaction.guild.name}**.`); // Obavijest korisniku putem DM-a
        } catch (error) {
            console.error(error); // Ispis greške u konzolu
            await interaction.reply({ content: 'Dogodila se greška prilikom pokušaja nijemljenja ovog korisnika.', ephemeral: true }); // Poruka o grešci
        }
    },
};
