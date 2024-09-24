const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock') // Ime komande
        .setDescription('Otključaj trenutni kanal.'), // Opis komande

    async execute(interaction) {
        const channel = interaction.channel; // Dohvati trenutni kanal

        try {
            // Omogući slanje poruka za svu publiku
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: true });
            await interaction.reply(`Kanal **${channel.name}** je otključan.`); // Potvrda otključavanja
        } catch (error) {
            console.error(error); // Ispis greške u konzolu
            await interaction.reply({ content: 'Dogodila se greška prilikom pokušaja otključavanja ovog kanala.', ephemeral: true }); // Poruka o grešci
        }
    },
};
