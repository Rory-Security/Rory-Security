const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	], partials: [
		Partials.User,
		Partials.Channel,
		Partials.Message,
		Partials.GuildMember,
		Partials.Reaction
	]
});
//-----------------------
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;
//-----------------------
module.exports = client;
//-----------------------
fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});
//-----------------------
client.login(require('./config.json').token).then(() => console.log(require('chalk').cyanBright(('Successfully Connecting To ' + client.user.tag))))
//-----------------------
client.on('error', () => { })
client.on('shardError', error => {return})
process.on('unhandledRejection', () => {return})
//-----------------------