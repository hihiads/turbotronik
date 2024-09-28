const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Poljubi nekoga.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Izaberi korisnika kog želiš da poljubiš')
                .setRequired(false)), // Ova opcija nije obavezna

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (user) {
            await interaction.reply(`${interaction.user.username} je poljubio/la ${user.username} 😘`);
        } else {
            await interaction.reply(`${interaction.user.username} je poljubio/la nekoga 😘`);
        }
    },
};
