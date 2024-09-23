const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute korisnika.')
        .addUserOption(option => option.setName('target').setDescription('Korisnik koji treba biti mutiran').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.resolve(target);

        if (!interaction.member.permissions.has('MUTE_MEMBERS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        if (member) {
            await member.voice.setMute(true);
            await interaction.reply(`${target.tag} je mutiran.`);
        } else {
            await interaction.reply('Korisnik nije pronađen ili nije moguće mutirati.');
        }
    },
};
