const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user from the server.')
        .addStringOption(option =>
            option.setName('user_id')
                .setDescription('The ID of the user to unban')
                .setRequired(true)),

    async execute(interaction) {
        const userId = interaction.options.getString('user_id');

        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply(`Unbanned user with ID: ${userId}`);
            const user = await interaction.client.users.fetch(userId);
            await user.send(`You have been unbanned from **${interaction.guild.name}**.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to unban this user.', ephemeral: true });
        }
    },
};
