const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Uklanja ban korisniku.')
        .addStringOption(option => option.setName('userid').setDescription('ID korisnika za unban').setRequired(true)),
    async execute(interaction) {
        const userId = interaction.options.getString('userid');

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply(`Korisnik sa ID ${userId} je unbanovan.`);
        } catch (error) {
            await interaction.reply(`Došlo je do greške: ${error.message}`);
        }
    },
};
