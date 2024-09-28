const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const TENOR_API_KEY = 'AIzaSyAbuXZwuVzyj8_Q07qbmVgl9GHVvDROUrc';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nom')
        .setDescription('Jedi nešto ukusno.')
        .addStringOption(option =>
            option.setName('food')
                .setDescription('Šta jedeš?')
                .setRequired(false)),

    async execute(interaction) {
        const food = interaction.options.getString('food');

        // Fetch GIF sa Tenor API-ja
        const response = await fetch(`https://g.tenor.com/v1/search?q=anime eating&key=${TENOR_API_KEY}&limit=1`);
        const { results } = await response.json();
        const gifUrl = results[0].media[0].gif.url;

        if (food) {
            await interaction.reply(`${interaction.user.username} jede ${food} 😋\n${gifUrl}`);
        } else {
            await interaction.reply(`${interaction.user.username} jede nešto ukusno 😋\n${gifUrl}`);
        }
    },
};
