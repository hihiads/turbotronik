const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute') // Ime komande
        .setDescription('Ponovno aktiviraj korisnika na serveru.') // Opis komande
        .addUserOption(option =>
            option.setName('user') // Ne prevodimo ime opcije
                .setDescription('Korisnik kojeg treba ponovo aktivirati') // Opis opcije
                .setRequired(true)), // Obavezna opcija

    async execute(interaction) {
        const user = interaction.options.getUser('user'); // Dohvati korisnika iz opcije
        const member = await interaction.guild.members.fetch(user.id); // Dohvati člana iz servera
        
        const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted'); // Potraži ulogu "Muted"
        if (!mutedRole) {
            return interaction.reply({ content: 'Uloga "Muted" ne postoji.', ephemeral: true }); // Poruka ako uloga ne postoji
        }

        try {
            await member.roles.remove(mutedRole); // Ukloni ulogu "Muted" s korisnika
            await interaction.reply(`Ponovno aktiviran **${user.tag}**.`); // Potvrda ponovnog aktiviranja
            await user.send(`Ponovno ste aktivirani u **${interaction.guild.name}**.`); // Obavijest korisniku putem DM-a
        } catch (error) {
            console.error(error); // Ispis greške u konzolu
            await interaction.reply({ content: 'Dogodila se greška prilikom pokušaja ponovnog aktiviranja ovog korisnika.', ephemeral: true }); // Poruka o grešci
        }
    },
};
