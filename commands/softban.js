const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('softban')
        .setDescription('Banuje i unbanuje korisnika (softban).')
        .addUserOption(option => option.setName('target').setDescription('Korisnik koji treba biti softbanovan').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Razlog softbana')),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'Nema razloga';

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        const member = interaction.guild.members.resolve(target);
        if (member) {
            await member.ban({ reason });
            await interaction.guild.members.unban(target.id);
            await interaction.reply(`${target.tag} je softbanovan (banovan i odmah unbanovan).`);
        } else {
            await interaction.reply('Korisnik nije pronađen ili nije moguće softbanovati.');
        }
    },
};
