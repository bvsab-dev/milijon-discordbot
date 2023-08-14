const {token} = require("./config.json");
const {cid} = require('./config.json');
const {REST} = require('@discordjs/rest')
const {Routes} = require("discord-api-types/v9");
const { Client, Intents, Collection, IntentsBitField, MessageEmbed } = require('discord.js');
const mysql = require('mysql');
const fs = require('fs')
const path = require('path');
const { ActivityType } = require('discord.js');

const client = new Client
({ intents: [IntentsBitField.Flags.Guilds,
	IntentsBitField.Flags.GuildMessages,
IntentsBitField.Flags.GuildVoiceStates] });


client.on("ready", async () => {
    console.log("Bot is ready!");
    client.user.setPresence({ activities: [{ name: 'Milijon', type: ActivityType.Listening }], status: 'idle' });

    const commands = [];
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, 'commands');

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }

    const guildIDs = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({ version: '9' }).setToken(token);

    for (const guildID of guildIDs) {
        try {
            await rest.put(Routes.applicationGuildCommands(client.user.id, guildID), { body: commands });
            console.log(`Zaktualizowano komendy na serwerze o ID: ${guildID}`);
        } catch (error) {
            console.error(`Wystąpił błąd podczas aktualizacji komend na serwerze o ID: ${guildID}`);
            console.error(error);
        }
    }
});

client.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;
	
	const command = client.commands.get(interaction.commandName)
	try {
		await command.execute(interaction);
	}
	catch(error) {
		console.log(error);
		await interaction.reply({content: 'Nie ma takiej komendy'})
	}
});


client.login(token);