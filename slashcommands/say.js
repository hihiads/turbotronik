const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user in the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mute')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);

        let mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (!mutedRole) {
            mutedRole = await interaction.guild.roles.create({
                name: 'Muted',
                permissions: [],
            });
            interaction.guild.channels.cache.forEach(async (channel) => {
                await channel.permissionOverwrites.create(mutedRole, {
                    SEND_MESSAGES: false,
                    SPEAK: false,
                });
            });
        }

        try {
            await member.roles.add(mutedRole);
            await interaction.reply(`Muted **${user.tag}**.`);
            await user.send(`You have been muted in **${interaction.guild.name}**.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error trying to mute this user.', ephemeral: true });
        }
    },
};
