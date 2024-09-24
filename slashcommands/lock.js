const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Lock the current channel.'),

    async execute(interaction) {
        const channel = interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });
            await interaction.reply(`Channel **${channel.name}** has been locked.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to lock this channel.', ephemeral: true });
        }
    },
};
