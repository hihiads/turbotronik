const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Postavlja slowmode na kanalu.')
        .addIntegerOption(option => option.setName('seconds').setDescription('Vreme u sekundama').setRequired(true)),
    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');

        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        await interaction.channel.setRateLimitPerUser(seconds);
        await interaction.reply(`Slowmode je postavljen na ${seconds} sekundi.`);
    },
};
