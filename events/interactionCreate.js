module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.slashCommands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Greška prilikom izvršavanja komande ${interaction.commandName}:`, error);
            await interaction.reply({
                content: 'Došlo je do greške prilikom izvršavanja komande.',
                ephemeral: true,
            });
        }
    },
};
