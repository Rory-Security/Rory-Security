const { ActivityType } = require('discord.js');
const chalk = require('chalk');
const client = require('..');
const db = require('quick.db')

client.on('ready', () => {
	console.log(chalk.red(`Successfully Loading Project Event`))

	setInterval(() => {
		client.user.setActivity(`Join ${client.guilds.cache.size} Guilds | /guide`, { type: ActivityType.Competing })
		client.user.setPresence({ status: 'dnd' })

		client.channels.fetch(require('../config.json').voiceCN).then(channel => {
			let VoiceConnection = require('@discordjs/voice').joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			})
		})
	}, 20000)
	
	setInterval(() => {
		db.all().forEach(Datas => {
			if(Datas.ID.startsWith('limitnum_')){
				db.delete(Datas.ID)
			}
		})
	}, 600000)
});