const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Uklanja mute korisniku.')
        .addUserOption(option => option.setName('target').setDescription('Korisnik koji treba biti unmutiran').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.resolve(target);

        if (!interaction.member.permissions.has('MUTE_MEMBERS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        if (member) {
            await member.voice.setMute(false);
            await interaction.reply(`${target.tag} je unmutiran.`);
        } else {
            await interaction.reply('Korisnik nije pronađen ili nije moguće unmutirati.');
        }
    },
};
