const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banuje korisnika sa servera.')
        .addUserOption(option => option.setName('target').setDescription('Korisnik koji treba biti banovan').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Razlog bana')),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'Nema razloga';

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        const member = interaction.guild.members.resolve(target);
        if (member) {
            await member.ban({ reason });
            await interaction.reply(`${target.tag} je banovan zbog: ${reason}`);
        } else {
            await interaction.reply('Korisnik nije pronađen ili nije moguće banovati.');
        }
    },
};
