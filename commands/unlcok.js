const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Otključava kanal.'),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: true });
        await interaction.reply('Kanal je otključan.');
    },
};
