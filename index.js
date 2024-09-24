const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { Player } = require('discord-player');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES // Obavezno za rad sa glasovnim kanalima
    ]
});

// Inicijalizacija player-a

// Inicijalizacija player-a
client.commands = new Collection();

// Učitavanje komandi
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event listener za kada bot bude spreman
client.on('ready', () => {
    console.log(`Prijavljen kao ${client.user.tag}`);

    // Postavi status
    client.user.setActivity('!help | snagapiksela.net', { type: 'PLAYING' });
});

// Event listener za poruke
client.on('messageCreate', async (message) => {
    // Ignoriranje poruka od bota i bez prefiksa
    if (!message.content.startsWith('!') || message.author.bot) return;

    // Razdvaja komandu i argumente
    const args = message.content.slice('!'.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Provjera postoji li komanda
    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        // Izvrši komandu
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Došlo je do greške prilikom izvršavanja te komande.');
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
