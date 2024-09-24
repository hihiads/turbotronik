const fs = require('fs'); // File system module to read and write JSON files
const prefixes = require('./prefixes.json'); // Import the prefixes JSON file

module.exports = {
    name: 'setprefix',
    description: 'Changes the bot prefix for this server.',
    async execute(message, args) {
        // Proveri da li korisnik ima administratorske privilegije
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have permission to change the prefix.');
        }

        // Proveri da li je unet novi prefiks
        if (!args[0]) {
            return message.reply('Please provide a new prefix.');
        }

        const newPrefix = args[0];

        // Postavi novi prefiks za server (guild)
        prefixes[message.guild.id] = newPrefix;

        // Snimi novi prefiks u JSON fajl
        fs.writeFile('./prefixes.json', JSON.stringify(prefixes, null, 4), err => {
            if (err) {
                console.error(err);
                return message.reply('There was an error saving the new prefix.');
            }

            message.reply(`Prefix successfully changed to \`${newPrefix}\``);
        });
    }
};
