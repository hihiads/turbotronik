const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('softban') // Ime komande
        .setDescription('Softban korisnika s servera.') // Opis komande
        .addUserOption(option =>
            option.setName('user') // Ne prevodimo ime opcije
                .setDescription('Korisnik kojeg treba softbanati') // Opis opcije
                .setRequired(true)) // Obavezna opcija
        .addStringOption(option =>
            option.setName('reason') // Ne prevodimo ime opcije
                .setDescription('Razlog za softban')),

    async execute(interaction) {
        const user = interaction.options.getUser('user'); // Dohvati korisnika iz opcije
        const reason = interaction.options.getString('reason') || 'Nema navedenog razloga'; // Dohvati razlog
        const member = await interaction.guild.members.fetch(user.id); // Dohvati člana iz servera

        if (!member) {
            return interaction.reply({ content: 'Korisnik nije pronađen na ovom serveru.', ephemeral: true }); // Poruka ako korisnik nije pronađen
        }

        try {
            await member.ban({ reason }); // Softban korisnika
            await interaction.guild.members.unban(user.id); // Ponovno odblokiraj korisnika
            await interaction.reply(`Softbanan **${user.tag}** zbog: ${reason}`); // Potvrda softbana
            await user.send(`Softbanani ste iz **${interaction.guild.name}** zbog: ${reason}`); // Obavijest korisniku putem DM-a
        } catch (error) {
            console.error(error); // Ispis greške u konzolu
            await interaction.reply({ content: 'Dogodila se greška prilikom pokušaja softbana ovog korisnika.', ephemeral: true }); // Poruka o grešci
        }
    },
};
