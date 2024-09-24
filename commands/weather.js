const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'weather',
    description: 'Get the weather information for a specific city',
    async execute(message, args) {
        // Proveravamo da li je korisnik uneo grad
        if (!args.length) {
            return message.channel.send('Please provide a city name!');
        }

        const city = args.join(' '); // Spojimo argumente u naziv grada
        const apiKey = "97b067042ffc4d2b71f83135fd2adbae";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            // HTTP GET zahtev ka OpenWeather API-ju
            const response = await axios.get(url);
            const weatherData = response.data;

            // Izvlačimo podatke o vremenu
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const humidity = weatherData.main.humidity;
            const weatherDescription = weatherData.weather[0].description;
            const windSpeed = weatherData.wind.speed;
            const cityName = weatherData.name;
            const country = weatherData.sys.country;

            // Kreiramo embed poruku
            const weatherEmbed = new MessageEmbed()
                .setTitle(`Weather in ${cityName}, ${country}`)
                .setDescription(weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1))
                .setColor('#00aaff')
                .addFields(
                    { name: 'Temperatura', value: `${temp}°C`, inline: true },
                    { name: 'Osjeća se kao', value: `${feelsLike}°C`, inline: true },
                    { name: 'Vlažnost', value: `${humidity}%`, inline: true },
                    { name: 'Brzina vjetra', value: `${windSpeed} m/s`, inline: true }
                )
                .setFooter("SnagaPiksela and Turbotronik team")
                .setTimestamp();

            // Šaljemo embed poruku na Discord kanal
            message.channel.send({ embeds: [weatherEmbed] });
        } catch (error) {
            console.error(error);
            message.channel.send('Ne mogu povući podatke o tom gradu! Molim te provjeri jesi li dobro napisao/la.');
        }
    },
};
