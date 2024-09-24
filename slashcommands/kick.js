const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Izbaci korisnika sa servera.')
        .addUserOption(option =>
            option.setName('user') // Ne prevodimo ime opcije
                .setDescription('Korisnik kojeg treba izbaciti')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason') // Ne prevodimo ime opcije
                .setDescription('Razlog za izbacivanje')),

    async execute(interaction) {
        const user = interaction.options.getUser('user'); // Ne prevodimo ime opcije
        const reason = interaction.options.getString('reason') || 'Nema navedenog razloga'; // Poruka ako nije naveden razlog
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) {
            return interaction.reply({ content: 'Korisnik nije pronađen na ovom serveru.', ephemeral: true });
        }

        try {
            await member.kick(reason);
            await interaction.reply(`Izbačen **${user.tag}** zbog: ${reason}`);
            await user.send(`Izbačeni ste iz **${interaction.guild.name}** zbog: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Dogodila se greška prilikom pokušaja izbacivanja ovog korisnika.', ephemeral: true });
        }
    },
};
