const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say') // Ime komande
        .setDescription('Ponovi poruku koju pošalješ.') // Opis komande
        .addStringOption(option => 
            option.setName('message') // Ne prevodimo ime opcije
                .setDescription('Poruka koju treba ponoviti') // Opis opcije
                .setRequired(true)), // Obavezna opcija
    async execute(interaction) {
        const message = interaction.options.getString('message'); // Dohvati poruku iz opcije
        await interaction.reply(message); // Odgovara s porukom
    },
};
