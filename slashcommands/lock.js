const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock') // Ime komande
        .setDescription('Zaključaj trenutni kanal.'), // Opis komande

    async execute(interaction) {
        const channel = interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false }); // Onemogući slanje poruka za svu publiku
            await interaction.reply(`Kanal **${channel.name}** je zaključan.`); // Potvrda
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Dogodila se greška prilikom pokušaja zaključavanja ovog kanala.', ephemeral: true }); // Poruka o grešci
        }
    },
};
