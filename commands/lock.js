const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Zaključava kanal.'),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });
        await interaction.reply('Kanal je zaključan.');
    },
};
