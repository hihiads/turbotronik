const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick korisnika sa servera.')
        .addUserOption(option => option.setName('target').setDescription('Korisnik koji treba biti kickovan').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Razlog kickovanja')),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'Nema razloga';

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        const member = interaction.guild.members.resolve(target);
        if (member) {
            await member.kick(reason);
            await interaction.reply(`${target.tag} je kickovan zbog: ${reason}`);
        } else {
            await interaction.reply('Korisnik nije pronađen ili nije moguće kickovati.');
        }
    },
};
