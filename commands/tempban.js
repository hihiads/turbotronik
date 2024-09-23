const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempban')
        .setDescription('Privremeni ban korisnika.')
        .addUserOption(option => option.setName('target').setDescription('Korisnik koji treba biti banovan').setRequired(true))
        .addIntegerOption(option => option.setName('duration').setDescription('Trajanje bana u minutama').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('Nemaš dozvolu za ovu komandu.');
        }

        const member = interaction.guild.members.resolve(target);
        if (member) {
            await member.ban({ reason: `Tempban na ${duration} minuta` });
            await interaction.reply(`${target.tag} je banovan na ${duration} minuta.`);

            setTimeout(async () => {
                await interaction.guild.members.unban(target.id);
                interaction.channel.send(`${target.tag} je unbanovan nakon ${duration} minuta.`);
            }, duration * 60000); // Pretvaranje minuta u milisekunde
        } else {
            await interaction.reply('Korisnik nije pronađen ili nije moguće banovati.');
        }
    },
};
