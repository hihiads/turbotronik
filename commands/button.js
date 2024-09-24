const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'button',
    description: 'Game: See how many times you can press a button in a short time!',
    async execute(message, args) {
        // Create a new button
        const button = new MessageButton()
            .setCustomId('button_click')
            .setLabel('Click me!')
            .setStyle('PRIMARY');

        // Create a row for the button
        const row = new MessageActionRow().addComponents(button);

        // Send initial message with the button
        const msg = await message.channel.send({
            content: 'How many times can you press the button in 0 seconds?',
            components: [row],
        });

        let count = 0; // Counter to track button presses

        // Create a collector to listen for button clicks
        const filter = (interaction) => interaction.customId === 'button_click';
        const collector = msg.createMessageComponentCollector({ filter, time: 1000 }); // 1000ms = 1 second

        collector.on('collect', (interaction) => {
            count++;
            interaction.reply({ content: `You've clicked the button ${count} times!`, ephemeral: true });
        });

        collector.on('end', () => {
            msg.edit({ content: `Time's up! You clicked the button ${count} times.`, components: [] });
        });
    },
};
