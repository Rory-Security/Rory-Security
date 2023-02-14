const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, StringSelectMenuBuilder, ChannelType } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'securitylogs',
	description: 'Set securitylogs',
	cooldown: 30000,
	type: ApplicationCommandType.ChatInput,
		options: [
		    {
		    	name: 'channel',
		    	description: 'Mention Rory Logs Channel',
		    	type: ApplicationCommandOptionType.Channel,
		    	required: false,
		    }	
		],

	run: async (client, interaction) => {
        var logchannel = interaction.options.getChannel('channel')
		var ExtraOwners = await db.get(`guild_extras_${interaction.guild.id}`)

		if(
            interaction.user.id == interaction.guild.ownerId ||
            interaction.user.id == CFG.Smath ||
            interaction.user.id == CFG.Parzival ||
            ExtraOwners && ExtraOwners.find(a => a.user == interaction.user.id)
        ){

            let SecurityLogEmbeD = new EmbedBuilder()
            if(logchannel){
                if (logchannel.type == ChannelType.GuildText) {
                    db.set(`guild_securitylogs_${interaction.guild.id}`, logchannel.id)
                    SecurityLogEmbeD.setColor('#adadad')
                    SecurityLogEmbeD.setDescription(`<:Done:1059410425013350440> ${logchannel} was set for security logs`)
                } else {
                    SecurityLogEmbeD.setColor('#656565')
                    SecurityLogEmbeD.setDescription('<:Failed:1059410444634312714> plees select **TEXT_CHANNEL** for security logs')
                }
            } else {
                if(interaction.channel.type == ChannelType.GuildText){
                    db.set(`guild_securitylogs_${interaction.guild.id}`, interaction.channel.id)
                    SecurityLogEmbeD.setColor('#adadad')
                    SecurityLogEmbeD.setDescription(`<:Done:1059410425013350440> <#${interaction.channel.id}> was set for security logs`)
                } else {
                    SecurityLogEmbeD.setColor('#656565')
                    SecurityLogEmbeD.setDescription('<:Failed:1059410444634312714> plees use this commant in **TEXT_CHANNEL**')
                }
            }

            interaction.reply({ embeds: [SecurityLogEmbeD] })


		} else {
			let ErrEm = new EmbedBuilder()
			.setColor('#292929')
			.setDescription('<:Error:1059410435058708550> Just **Owner** And **ExtraOwner** Can use This Command*!*')

			interaction.reply({ embeds: [ErrEm], ephemeral: true })
		}
	}
};