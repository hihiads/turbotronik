const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ulogovan kao ${client.user.tag}!`);

        const commands = [];
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        // Učitavanje svih komandi u format potreban za Discord API
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            commands.push(command.data.toJSON());
        }
        console.log('Registrovanje komandi:', commands.map(command => command.name));


        const rest = new REST({ version: '9' }).setToken('MTI4Njc4Njc3MDc2NzMxNTAwNg.GLSohG.ltC0M16CNQ_jFltP_PpFbVAmdsMbD1XvoX0ljE');

        try {
            console.log('Počinje osvježavanje (/) komandi...');

            // Registrovanje slash komandi za jedan guild (za razvoj)
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, '1278768641554387014'),
                { body: commands },
            );

            console.log('(/) komande su uspešno registrovane.');
        } catch (error) {
            console.error('Greška prilikom registracije komandi:', error);
        }
    },
};
