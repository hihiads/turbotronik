const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banuje korisnika sa servera.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Korisnik kojeg želiš banovati.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Razlog bana.')),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Nema razloga.';
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) {
            return interaction.reply({ content: 'Korisnik nije pronađen u ovom serveru.', ephemeral: true });
        }

        try {
            await member.ban({ reason });
            await interaction.reply(`Banao sam **${user.tag}** za: ${reason}`);
            await user.send(`Banan si u serveru: **${interaction.guild.name}** iz razloga: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Error!.', ephemeral: true });
        }
    },
};
