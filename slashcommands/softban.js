const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('softban')
        .setDescription('Softban a user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to softban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the softban')),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) {
            return interaction.reply({ content: 'User not found in this guild.', ephemeral: true });
        }

        try {
            await member.ban({ reason });
            await interaction.guild.members.unban(user.id);
            await interaction.reply(`Softbanned **${user.tag}** for: ${reason}`);
            await user.send(`You have been softbanned from **${interaction.guild.name}** for: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to softban this user.', ephemeral: true });
        }
    },
};
