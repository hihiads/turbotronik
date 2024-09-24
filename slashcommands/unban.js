const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban') // Ime komande
        .setDescription('Ponovno aktiviraj korisnika na serveru.') // Opis komande
        .addStringOption(option =>
            option.setName('user_id') // Ne prevodimo ime opcije
                .setDescription('ID korisnika kojeg treba ponovo aktivirati') // Opis opcije
                .setRequired(true)), // Obavezna opcija

    async execute(interaction) {
        const userId = interaction.options.getString('user_id'); // Dohvati ID korisnika

        try {
            await interaction.guild.members.unban(userId); // Ponovno aktiviraj korisnika
            await interaction.reply(`Ponovno aktiviran korisnik s ID: ${userId}`); // Potvrda ponovnog aktiviranja
            const user = await interaction.client.users.fetch(userId); // Dohvati korisnika
            await user.send(`Ponovno ste aktivirani iz **${interaction.guild.name}**.`); // Obavijest korisniku putem DM-a
        } catch (error) {
            console.error(error); // Ispis greške u konzolu
            await interaction.reply({ content: 'Dogodila se greška prilikom pokušaja ponovnog aktiviranja ovog korisnika.', ephemeral: true }); // Poruka o grešci
        }
    },
};
