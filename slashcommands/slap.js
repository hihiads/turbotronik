const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const TENOR_API_KEY = 'AIzaSyAbuXZwuVzyj8_Q07qbmVgl9GHVvDROUrc';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Ošamari nekoga.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Izaberi korisnika kog želiš da ošamariš')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');

        // Fetch GIF sa Tenor API-ja
        const response = await fetch(`https://g.tenor.com/v1/search?q=anime slap&key=${TENOR_API_KEY}&limit=1`);
        const { results } = await response.json();
        const gifUrl = results[0].media[0].gif.url;

        if (user) {
            await interaction.reply(`${interaction.user.username} je ošamario/la ${user.username} 👋\n${gifUrl}`);
        } else {
            await interaction.reply(`${interaction.user.username} je ošamario/la nekoga 👋\n${gifUrl}`);
        }
    },
};
