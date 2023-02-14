const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ChannelType } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'setlimit',
	description: 'Set Anti Limit',
	cooldown: 5000,
	type: ApplicationCommandType.ChatInput,

		options: [
			{
				name: 'section',
				description: 'Select Section',
				type: ApplicationCommandOptionType.String,
				required: true,
				choices: [
					{ name: '@everyone/@here', value: 'everyonehere' },
					{ name: 'InviteLink', value: 'invitelink' },
					{ name: 'KickMember', value: 'kickmember' },
					{ name: 'BanMember', value: 'banmember' },
					{ name: 'CreateRole', value: 'createrole' },
					{ name: 'DeleteRole', value: 'deleterole' },
					{ name: 'UpdateRole', value: 'updaterole' },
					{ name: 'CreateChannel', value: 'createchannel' },
					{ name: 'DeleteChannel', value: 'deletechannel' },
					{ name: 'UpdateChannel', value: 'updatechannel' },
				]
			}, {
				name: 'number',
				description: 'Number OF limit',
				type: ApplicationCommandOptionType.Number,
				required: true,
			}
		],


	run: async (client, interaction) => {
        var section = interaction.options.get('section').value
        var number = interaction.options.get('number').value
		var ExtraOwners = await db.get(`guild_extras_${interaction.guild.id}`)
        if(interaction.channel.type == ChannelType.GuildText){
			if(
	            interaction.user.id == interaction.guild.ownerId ||
	            interaction.user.id == CFG.Smath ||
	            interaction.user.id == CFG.Parzival ||
	            ExtraOwners && ExtraOwners.find(a => a.user == interaction.user.id)
	        ){
				let limitEmbed = new EmbedBuilder()


				if(number < 0 || number > 10){
					limitEmbed.setColor('#656565')
					limitEmbed.setDescription('<:Failed:1059410444634312714> The limit must be between 0 and 10, otherwise Rory will not work')
					return interaction.reply({
						embeds: [limitEmbed],
						ephemeral: true,
					})
				}

				if(section == 'everyonehere'){
					db.set(`guild_everyoneherelimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **@everyone/@here limit** Was Update To ${number} in 10min`)
			 	} else if(section == 'invitelink'){
					db.set(`guild_invitelinklimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Invite Link limit** Was Update To ${number} in 10min`)
			 	} else if(section == 'kickmember'){
					db.set(`guild_kicklimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Kick Member limit** Was Update To ${number} in 10min`)
				} else if(section == 'banmember'){
					db.set(`guild_banlimitlimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Ban Member limit** Was Update To ${number} in 10min`)
				} else if(section == 'createrole'){
					db.set(`guild_createrolelimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Create Role limit** Was Update To ${number} in 10min`)
				} else if(section == 'deleterole'){
					db.set(`guild_deleterolelimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Delete Role limit** Was Update To ${number} in 10min`)
				} else if(section == 'updaterole'){
					db.set(`guild_updaterolelimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Update Role limit** Was Update To ${number} in 10min`)
				} else if(section == 'createchannel'){
					db.set(`guild_createchannellimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Create Channel limit** Was Update To ${number} in 10min`)
				} else if(section == 'deletechannel'){
					db.set(`guild_deletechannellimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Delete Channel limit** Was Update To ${number} in 10min`)
				} else if(section == 'updatechannel'){
					db.set(`guild_updatechannellimit_${interaction.guild.id}`, number)
					limitEmbed.setColor('#adadad')
					limitEmbed.setDescription(`<:Done:1059410425013350440> Anti **Update Channel limit** Was Update To ${number} in 10min`)
				}

				interaction.reply({
					embeds: [limitEmbed]
				})

			} else {
				let ErrEm = new EmbedBuilder()
				.setColor('#292929')
				.setDescription('<:Error:1059410435058708550> Just **Owner** And **ExtraOwner** Can use This Command*!*')

				interaction.reply({ embeds: [ErrEm], ephemeral: true })
			}
		} else {
			let CHEmbeD = new EmbedBuilder()
			.setColor('#292929')
			.setDescription('<:Error:1059410435058708550> Please use This Command in a Channel With Type **Text**')
			interaction.reply({ embeds: [CHEmbeD], ephemeral: true })
		}
	}
};