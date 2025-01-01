const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

// const cron = require('node-cron');
const { Client, Collection, Intents } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');

const switchLimiter = rateLimit({
	windowMs: 2000, // 2 seconds
	max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

global.__basedir = __dirname;

const HOST = '0.0.0.0';
const PORT = 8080;

const app = express();



const myIntents = new Intents();
// Intents.FLAGS.GUILD_PRESENCES
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS);
const client = new Client({ intents: myIntents });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

const db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/api'));
app.use('/meeting', require('./routes/meeting'));
// app.use('/discord', require('./routes/discord'));
// app.use('/tuya', require('./routes/tuya'));
app.use('/static', express.static(path.join(__dirname, 'assets', 'public')));

app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'public', 'index.html'));
});

app.listen((HOST, PORT), () => {
  console.log('https://api.chadlim1.repl.co/');
  // console.log(path.join(__basedir, 'routes'));
  client.login(process.env.TOKEN);



  mongoose.connect(`mongodb+srv://admin:${process.env.dbPass}@cluster0.tshns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
});

/*
DiscordJS
https://discordjs.guide/creating-your-bot/command-handling.html
*/
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  (async () => {
    guilds = await client.guilds.fetch();
    guilds.forEach(guild => {
      (async () => {
        guild = await guild.fetch();
        members = await guild.members.fetch();
      })();
    });
  })();
  guilds = discordClient.guilds.cache;

  for (guild of guilds) {
    // console.log(guild);
    rest.put(Routes.applicationGuildCommands("969182238178680842", guild[0]), { body: commands })
      .then(() => console.log('Successfully registered application commands.'))
      .catch(console.error);
  }
  app.use('/discord', require('./routes/discord'));
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

/*
Mongoose
*/
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to mongodb");
  app.use('/switch', switchLimiter);
  app.use('/switch', require('./routes/switch'));

});

global.discordClient = client;