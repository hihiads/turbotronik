const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const path = require('path');
const prefixes = require('./commands/prefixes.json');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_BANS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.MESSAGE_CONTENT
    ] 
});

const logEventFiles = fs.readdirSync('./logevents').filter(file => file.endsWith('.js'));
for (const file of logEventFiles) {
    const event = require(`./logevents/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Inicijalizacija player-a

client.commands = new Collection();
client.slashCommands = new Collection();

// Učitaj klasične komande iz foldera ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.name, command);
}

// Učitaj slash komande iz foldera ./slashcommands
const slashCommandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));
for (const file of slashCommandFiles) {
    const command = require(path.join(__dirname, 'slashcommands', file));
    client.slashCommands.set(command.data.name, command);
}

// Događaj kada je bot spreman
client.once('ready', async () => {
    console.log(`${client.user.tag} is online!`);

    // Registracija slash komandi globalno
    const commands = client.slashCommands.map(cmd => cmd.data.toJSON());

    try {
        await client.application.commands.set(commands);
        console.log('Slash commands registered globally!');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
});

// Događaj za svaki primljeni message
client.on('messageCreate', message => {
    // Proveravamo da li je poruka poslata u DM-u ili je od bota
    if (!message.guild || message.author.bot) return;

    // Dohvati prefiks za trenutni server ili koristi podrazumevani prefiks
    const prefix = prefixes[message.guild.id] || prefixes['default'];

    // Ako poruka ne počinje prefiksom, zanemari je
    if (!message.content.startsWith(prefix)) return;

    // Parsiraj komandu i argumente
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Pronađi komandu u kolekciji komandi
    let command = client.commands.get(commandName);

    // Ako komanda ne postoji, proveri da li postoji kao alias
    if (!command) {
        command = client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    }

    // Ako komanda ne postoji, prekini
    if (!command) return;

    // Izvrši komandu
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
});

// Događaj za interakcije (slash komande)
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
            }
        }
    }
});


const afkCommand = require('./commands/afk.js');

 // Zamijenite sa stvarnom putanjom
client.on('messageCreate', message => {
    if (message.author.bot) return; // Ignoriramo poruke bota

    // Provjeravamo AFK status spomenutih korisnika
    const mentionedUsers = message.mentions.users;
    mentionedUsers.forEach(user => {
        if (afkCommand.afkUsers.has(user.id)) {
            const afkData = afkCommand.afkUsers.get(user.id);
            const afkDuration = Math.floor((Date.now() - afkData.timestamp) / 60000); // Trajanje u minutama
            message.channel.send(`**${user.username}** je AFK: "${afkData.message}". AFK je ${afkDuration} minuta.`);
        }
    });

    // Ako AFK korisnik pošalje poruku, uklanjamo AFK status
    const userId = message.author.id;
    if (afkCommand.afkUsers.has(userId)) {
        const afkData = afkCommand.afkUsers.get(userId);

        // Ako je poruka ista kao i ona kojom je postavljen AFK, ne uklanjamo status
        if (message.id === afkData.lastMessageId) {
            return;
        }

        const afkDuration = Math.floor((Date.now() - afkData.timestamp) / 60000);
        afkCommand.afkUsers.delete(userId);

        const guildMember = message.guild.members.cache.get(userId);

        // Vraćamo originalno korisničko ime
        if (guildMember && guildMember.nickname && guildMember.nickname.startsWith('[AFK]')) {
            guildMember.setNickname(guildMember.nickname.replace('[AFK] ', ''));
        }

        message.reply(`Vratio/la si se, nisi više AFK! Bio si AFK ${afkDuration} minuta.`);
    }
});
const app = require('express')();

app.get('/', async (req,res) => {
  res.send('Hello');
});

app.listen(3000, async () => {
 console.log('Listening on port 3000');
});
// Login bota
client.login(process.env.token)
