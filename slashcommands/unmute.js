const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a user in the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to unmute')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);
        
        const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (!mutedRole) {
            return interaction.reply({ content: 'Muted role does not exist.', ephemeral: true });
        }

        try {
            await member.roles.remove(mutedRole);
            await interaction.reply(`Unmuted **${user.tag}**.`);
            await user.send(`You have been unmuted in **${interaction.guild.name}**.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to unmute this user.', ephemeral: true });
        }
    },
};
