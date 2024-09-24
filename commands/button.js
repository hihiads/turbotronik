const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'button',
    description: 'Igra: Pritisnite gumb što više puta u 0 sekundi!',
    async execute(message, args) {
        // Kreiraj novi gumb
        const button = new MessageButton()
            .setCustomId('button_click')
            .setLabel('Pritisni me!')
            .setStyle('PRIMARY');

        // Kreiraj redak za gumb
        const row = new MessageActionRow().addComponents(button);

        // Pošalji početnu poruku s gumbom
        const msg = await message.channel.send({
            content: 'Koliko puta možeš pritisnuti gumb u 0 sekundi?',
            components: [row],
        });

        let count = 0; // Brojač klikova na gumb

        // Kreiraj collector za prikupljanje klikova na gumb
        const filter = (interaction) => interaction.customId === 'button_click';
        const collector = msg.createMessageComponentCollector({ filter, time: 1000 }); // 1 sekunda za klikanje

        collector.on('collect', (interaction) => {
            count++;
            interaction.reply({ content: `Pritisnuo/la si gumb ${count} puta!`, ephemeral: true });
        });

        collector.on('end', () => {
            msg.edit({ content: `Vrijeme je isteklo! Pritisnuo/la si gumb ${count} puta.`, components: [] });
        });
    },
};
