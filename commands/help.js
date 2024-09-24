const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Prikazuje sve dostupne komande',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help Komanda - Dostupne Komande')
            .setDescription('Evo popisa svih dostupnih komandi')
            .addFields(
                { name: 'AFK', value: '`afk` - Označava vas kao AFK (odsutni)', inline: true },
                { name: 'Avatar', value: '`avatar` - Prikazuje vaš avatar ili avatar spomenutog korisnika', inline: true },
                { name: 'Ban', value: '`ban` - Banuje korisnika sa servera', inline: true },
                { name: 'Kick', value: '`kick` - Izbacuje korisnika sa servera', inline: true },
                { name: 'Lock', value: '`lock` - Zaključava trenutni kanal da se spriječi slanje poruka', inline: true },
                { name: 'Mute', value: '`mute` - Utišava korisnika na serveru', inline: true },
                { name: 'Slowmode', value: '`slowmode` - Postavlja sporiji način rada u kanalu', inline: true },
                { name: 'Softban', value: '`softban` - Privremeno banuje korisnika (ban i unban kako bi se obrisale njihove poruke)', inline: true },
                { name: 'Tempban', value: '`tempban` - Privremeno banuje korisnika na određeno vrijeme', inline: true },
                { name: 'Unban', value: '`unban` - Uklanja ban korisniku sa servera', inline: true },
                { name: 'Unmute', value: '`unmute` - Vraća zvuk korisniku koji je bio utišan', inline: true },
                { name: 'Unlock', value: '`unlock` - Otključava prethodno zaključan kanal', inline: true },
                { name: '8ball', value: '`8ball` - Odgovara na vaše pitanje nasumičnim odgovorom', inline: true },
                { name: 'Weather', value: '`weather` - Prikazuje informacije o vremenu za određeni grad', inline: true },
                { name: 'Button', value: '`button` - Kreira interaktivni gumb (test komanda)', inline: true }
            )
            .setFooter('Koristite . prije svake komande da biste ju izvršili, npr. .afk');

        message.channel.send({ embeds: [embed] });
    },
};
