const { EmbedBuilder, ApplicationCommandType, ChannelType, ApplicationCommandOptionType, } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'setpunishment',
	description: 'Set Punishment',
	cooldown: 60000,
	type: ApplicationCommandType.ChatInput,
		options: [
		    {
		    	name: 'punishment',
		    	description: 'Select Punishment',
		    	type: ApplicationCommandOptionType.String,
		    	required: true,
		    	choices: [
		    		{ name: 'Kick', value: 'kick' },
		    		{ name: 'Ban', value: 'ban' },
		    		{ name: 'Quarantine', value: 'quarantine' },
		    	]
		    }, {
		    	name: 'quarantinerole',
		    	description: 'Select The Quarantined Role',
		    	type: ApplicationCommandOptionType.Role,
		    	required: false,
		    }		
		],

	run: async (client, interaction) => {
        var punish = interaction.options.get('punishment').value
        var quarole = interaction.options.getRole('quarantinerole')
		var ExtraOwners = await db.get(`guild_extras_${interaction.guild.id}`)
        if(interaction.channel.type == ChannelType.GuildText){
    		if(
                interaction.user.id == interaction.guild.ownerId ||
                interaction.user.id == CFG.Smath ||
                interaction.user.id == CFG.Parzival ||
                ExtraOwners && ExtraOwners.find(a => a.user == interaction.user.id)
            ){
                let PunishEmbeD = new EmbedBuilder()

                if(punish == 'kick'){
                    db.delete(`guild_quarantinerole_${interaction.guild.id}`)
                    db.set(`guild_punishment_${interaction.guild.id}`, 'kick')
                    PunishEmbeD.setColor('#adadad')
                    PunishEmbeD.setDescription(`<:Done:1059410425013350440> **Punishment** Was Set To **Kick**`)
                } else if(punish == 'ban'){
                    db.delete(`guild_quarantinerole_${interaction.guild.id}`)
                    db.set(`guild_punishment_${interaction.guild.id}`, 'ban')
                    PunishEmbeD.setColor('#adadad')
                    PunishEmbeD.setDescription(`<:Done:1059410425013350440> **Punishment** Was Set To **Ban**`)
                } else if(punish == 'quarantine'){
                    if(quarole == null){
                        PunishEmbeD.setColor('#656565')
                        PunishEmbeD.setDescription('<:Failed:1059410444634312714> Plees Select **Quarantine** Role')
                        return interaction.reply({
                            embeds: [PunishEmbeD],
                            ephemeral: true,
                        })
                    } else {
                        db.set(`guild_punishment_${interaction.guild.id}`, 'quarantine')
                        db.set(`guild_quarantinerole_${interaction.guild.id}`, quarole.id)
                        PunishEmbeD.setColor('#adadad')
                        PunishEmbeD.setDescription(`<:Done:1059410425013350440> **Punishment** Was Set To **Quarantine** \nQuarantine Role: ${quarole}`)

                        return interaction.reply({
                            embeds: [PunishEmbeD]
                        })
                    }
                }
                interaction.reply({
                    embeds: [PunishEmbeD]
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