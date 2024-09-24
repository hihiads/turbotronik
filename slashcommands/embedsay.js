const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedsay')
        .setDescription('Repeats the message you send in an embed with optional title and color.')
        .addStringOption(option => 
            option.setName('description')
                .setDescription('The message to embed')
                .setRequired(true)) // Obavezna opcija
        .addStringOption(option => 
            option.setName('title')
                .setDescription('The title of the embed')
                .setRequired(false)) // Neobavezna opcija
        .addStringOption(option => 
            option.setName('color')
                .setDescription('The color of the embed in hex format (e.g. #ff0000)')
                .setRequired(false)), // Neobavezna opcija
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const color = interaction.options.getString('color') || '#0099ff'; // Default color

        // Kreiranje embed poruke
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(description);

        if (title) {
            embed.setTitle(title);
        }

        await interaction.reply({ embeds: [embed] }); // Odgovara sa embed porukom
    },
};
