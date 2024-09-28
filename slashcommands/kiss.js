const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const TENOR_API_KEY = 'AIzaSyAbuXZwuVzyj8_Q07qbmVgl9GHVvDROUrc'; // Stavi ovde svoj Tenor API ključ

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Poljubi nekoga.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Izaberi korisnika kog želiš da poljubiš')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');

        // Fetch GIF sa Tenor API-ja
        const response = await fetch(`https://g.tenor.com/v1/search?q=anime kiss&key=${TENOR_API_KEY}&limit=1`);
        const { results } = await response.json();
        const gifUrl = results[0].media[0].gif.url;

        if (user) {
            await interaction.reply(`${interaction.user.username} je poljubio/la ${user.username} 😘\n${gifUrl}`);
        } else {
            await interaction.reply(`${interaction.user.username} je poljubio/la nekoga 😘\n${gifUrl}`);
        }
    },
};
