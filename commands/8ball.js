const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Postavi pitanje magičnoj 8ball kugli!',
    async execute(message, args) {
        const responses = [
            "Da.",
            "Ne.",
            "Možda.",
            "Pitaj kasnije.",
            "Definitivno.",
            "Apsolutno ne.",
            "Nisam siguran.",
            "Sigurno je.",
            "Jako sumnjivo.",
        ];

        // Kreiraj gumb
        const button = new MessageButton()
            .setCustomId('8ball_click')
            .setLabel('Postavi pitanje')
            .setStyle('PRIMARY');

        // Kreiraj redak za gumb
        const row = new MessageActionRow().addComponents(button);

        // Pošalji početnu poruku s gumbom
        const msg = await message.channel.send({
            content: 'Klikni na gumb da postaviš pitanje 8ball kugli!',
            components: [row],
        });

        // Kreiraj collector za prikupljanje klikova na gumb
        const filter = (interaction) => interaction.customId === '8ball_click';
        const collector = msg.createMessageComponentCollector({ filter, time: 15000 }); // Aktivno 15 sekundi

        collector.on('collect', (interaction) => {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            interaction.reply({ content: `8ball kaže: ${randomResponse}`, ephemeral: true });
        });

        collector.on('end', () => {
            msg.edit({ content: '8ball igra je završena!', components: [] });
        });
    },
};
