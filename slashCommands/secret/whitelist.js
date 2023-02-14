const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ChannelType } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'whitelist',
	description: 'whitelist user',
//	cooldown: 5000,
	type: ApplicationCommandType.ChatInput,
		options: [
            {
		    	name: 'user',
		    	description: 'Mention User',
		    	type: ApplicationCommandOptionType.User,
		    	required: true,
		    }, {
		    	name: 'section',
		    	description: 'select section',
		    	type: ApplicationCommandOptionType.String,
		    	required: true,
		    	choices: [
					{ name: '@everyone/@here', value: 'everyonehere' },
					{ name: 'GuildUpdate', value: 'guildupdate' },
					{ name: 'InviteLink', value: 'invitelink' },
					{ name: 'AddBot', value: 'addbot' },
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
		    	name: 'model',
		    	description: 'ADD/REMOVE',
		    	type: ApplicationCommandOptionType.String,
		    	required: true,
		    	choices: [
		    		{ name: 'ADD', value: 'ad' },
		    		{ name: 'REMOVE', value: 're' },
		    	]
		    }	
		],

	run: async (client, interaction) => {
        let Whuser = interaction.options.getUser('user')
        var section = interaction.options.get('section').value
        var model = interaction.options.get('model').value
        var ExtraOwners = await db.get(`guild_extras_${interaction.guild.id}`)

        if(interaction.channel.type == ChannelType.GuildText){
    		if(
                interaction.user.id == interaction.guild.ownerId ||
                interaction.user.id == CFG.Smath ||
                interaction.user.id == CFG.Parzival ||
                ExtraOwners && ExtraOwners.find(a => a.user == interaction.user.id)
            ){

                let GetEveryoneHere = await db.get(`guild_everyonehere_whitelist_${interaction.guild.id}`)
                let GetGuildUpdate = await db.get(`guild_guildupdate_whitelist_${interaction.guild.id}`)
                let GetInviteLink = await db.get(`guild_invitelink_whitelist_${interaction.guild.id}`)
                let GetAddBot = await db.get(`guild_addbot_whitelist_${interaction.guild.id}`)
                let GetKickMember = await db.get(`guild_kickmember_whitelist_${interaction.guild.id}`)
                let GetBanMember = await db.get(`guild_banmember_whitelist_${interaction.guild.id}`)
                let GetCreateR = await db.get(`guild_createrole_whitelist_${interaction.guild.id}`)
                let GetDeleteR = await db.get(`guild_deleterole_whitelist_${interaction.guild.id}`)
                let GetUpdateR = await db.get(`guild_updaterole_whitelist_${interaction.guild.id}`)
                let GetCreateC = await db.get(`guild_createchannel_whitelist_${interaction.guild.id}`)
                let GetDeleteC = await db.get(`guild_deletechannel_whitelist_${interaction.guild.id}`)
                let GetUpdateC = await db.get(`guild_updatechannel_whitelist_${interaction.guild.id}`)

                let WhEmbed = new EmbedBuilder()


                if(section == 'everyonehere'){
                    if(model == 'ad'){
                        if (GetEveryoneHere && GetEveryoneHere.find(find => find.user == Whuser.id)) {
                                WhEmbed.setColor('#656565')
                                WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in @everyone@here whitelist`)

                            return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                        }

                        let whitelistadded = { user: Whuser.id }

                        db.push(`guild_everyonehere_whitelist_${interaction.guild.id}`, whitelistadded)
                        WhEmbed.setColor('#adadad')
                        WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to @everyone@here whitelist`)
                    } else if(model == 're'){
                        if (GetEveryoneHere && GetEveryoneHere.find(x => x.user === Whuser.id)) {
                            let data = GetEveryoneHere.find(x => x.user === Whuser.id)

                            let value = GetEveryoneHere.indexOf(data)
                            delete GetEveryoneHere[value]

                            let whitelistremove = GetEveryoneHere.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_everyonehere_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to @everyone@here whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the @everyone@here whitelist`)
                        }
                    }
                } else if(section == 'invitelink'){
                    if(model == 'ad'){
                        if (GetInviteLink && GetInviteLink.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in InviteLink whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_invitelink_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to InviteLink whitelist`)
                    } else if(model == 're'){
                        if (GetInviteLink && GetInviteLink.find(x => x.user === Whuser.id)) {
                            let data = GetInviteLink.find(x => x.user === Whuser.id)

                            let value = GetInviteLink.indexOf(data)
                            delete GetInviteLink[value]

                            let whitelistremove = GetInviteLink.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_invitelink_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to InviteLink whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the InviteLink whitelist`)
                        }
                    }
                } else if(section == 'addbot'){
                    if(model == 'ad'){
                        if (GetAddBot && GetAddBot.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in AddBot whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_addbot_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to AddBot whitelist`)
                    } else if(model == 're'){
                        if (GetAddBot && GetAddBot.find(x => x.user === Whuser.id)) {
                            let data = GetAddBot.find(x => x.user === Whuser.id)

                            let value = GetAddBot.indexOf(data)
                            delete GetAddBot[value]

                            let whitelistremove = GetAddBot.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_addbot_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to AddBot whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the AddBot whitelist`)
                        }
                    }
                } else if(section == 'kickmember'){
                    if(model == 'ad'){
                        if (GetKickMember && GetKickMember.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in KickMember whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_kickmember_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to KickMember whitelist`)
                    } else if(model == 're'){
                        if (GetKickMember && GetKickMember.find(x => x.user === Whuser.id)) {
                            let data = GetKickMember.find(x => x.user === Whuser.id)

                            let value = GetKickMember.indexOf(data)
                            delete GetKickMember[value]

                            let whitelistremove = GetKickMember.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_kickmember_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to KickMember whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the AddBot whitelist`)
                        }
                    }
                } else if(section == 'banmember'){
                    if(model == 'ad'){
                        if (GetBanMember && GetBanMember.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in BanMember whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_banmember_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to BanMember whitelist`)
                    } else if(model == 're'){
                        if (GetBanMember && GetBanMember.find(x => x.user === Whuser.id)) {
                            let data = GetBanMember.find(x => x.user === Whuser.id)

                            let value = GetBanMember.indexOf(data)
                            delete GetBanMember[value]

                            let whitelistremove = GetBanMember.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_banmember_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to BanMember whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the BanMember whitelist`)
                        }
                    }
                } else if(section == 'createrole'){
                    if(model == 'ad'){
                        if (GetCreateR && GetCreateR.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in CreateRole whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_createrole_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to CreateRole whitelist`)
                    } else if(model == 're'){
                        if (GetCreateR && GetCreateR.find(x => x.user === Whuser.id)) {
                            let data = GetCreateR.find(x => x.user === Whuser.id)

                            let value = GetCreateR.indexOf(data)
                            delete GetCreateR[value]

                            let whitelistremove = GetCreateR.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_createrole_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to CreateRole whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the CreateRole whitelist`)
                        }
                    }
                } else if(section == 'deleterole'){
                    if(model == 'ad'){
                        if (GetDeleteR && GetDeleteR.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in DeleteRole whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_deleterole_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to DeleteRole whitelist`)
                    } else if(model == 're'){
                        if (GetDeleteR && GetDeleteR.find(x => x.user === Whuser.id)) {
                            let data = GetDeleteR.find(x => x.user === Whuser.id)

                            let value = GetDeleteR.indexOf(data)
                            delete GetDeleteR[value]

                            let whitelistremove = GetDeleteR.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_deleterole_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to DeleteRole whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the DeleteRole whitelist`)
                        }
                    }
                } else if(section == 'updaterole'){
                    if(model == 'ad'){
                        if (GetUpdateR && GetUpdateR.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in UpdateRole whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_updaterole_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to UpdateRole whitelist`)
                    } else if(model == 're'){
                        if (GetUpdateR && GetUpdateR.find(x => x.user === Whuser.id)) {
                            let data = GetUpdateR.find(x => x.user === Whuser.id)

                            let value = GetUpdateR.indexOf(data)
                            delete GetUpdateR[value]

                            let whitelistremove = GetUpdateR.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_updaterole_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to UpdateRole whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the UpdateRole whitelist`)
                        }
                    }
                } else if(section == 'createchannel'){
                    if(model == 'ad'){
                        if (GetCreateC && GetCreateC.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in CreateChannel whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_createchannel_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to CreateChannel whitelist`)
                    } else if(model == 're'){
                        if (GetCreateC && GetCreateC.find(x => x.user === Whuser.id)) {
                            let data = GetCreateC.find(x => x.user === Whuser.id)

                            let value = GetCreateC.indexOf(data)
                            delete GetCreateC[value]

                            let whitelistremove = GetCreateC.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_createchannel_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to CreateChannel whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the CreateChannel whitelist`)
                        }
                    }
                } else if(section == 'deletechannel'){
                    if(model == 'ad'){
                        if (GetDeleteC && GetDeleteC.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in DeleteChannel whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_deletechannel_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to DeleteChannel whitelist`)
                    } else if(model == 're'){
                        if (GetDeleteC && GetDeleteC.find(x => x.user === Whuser.id)) {
                            let data = GetDeleteC.find(x => x.user === Whuser.id)

                            let value = GetDeleteC.indexOf(data)
                            delete GetDeleteC[value]

                            let whitelistremove = GetDeleteC.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_deletechannel_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to DeleteChannel whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the DeleteChannel whitelist`)
                        }
                    }
                } else if(section == 'updatechannel'){
                    if(model == 'ad'){
                        if (GetUpdateC && GetUpdateC.find(find => find.user == Whuser.id)) {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is already in UpdateChannel whitelist`)

                        return interaction.reply({ embeds: [WhEmbed], ephemeral: true })
                    }

                    let whitelistadded = { user: Whuser.id }

                    db.push(`guild_updatechannel_whitelist_${interaction.guild.id}`, whitelistadded)
                    WhEmbed.setColor('#adadad')
                    WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was added to UpdateChannel whitelist`)
                    } else if(model == 're'){
                        if (GetUpdateC && GetUpdateC.find(x => x.user === Whuser.id)) {
                            let data = GetUpdateC.find(x => x.user === Whuser.id)

                            let value = GetUpdateC.indexOf(data)
                            delete GetUpdateC[value]

                            let whitelistremove = GetUpdateC.filter(filt => { return filt != null && filt != '' })

                            db.set(`guild_updatechannel_whitelist_${interaction.guild.id}`, whitelistremove)
                            WhEmbed.setColor('#adadad')
                            WhEmbed.setDescription(`<:Done:1059410425013350440> ${Whuser} was removed to UpdateChannel whitelist`)
                        } else {
                            WhEmbed.setColor('#656565')
                            WhEmbed.setDescription(`<:Failed:1059410444634312714> ${Whuser} is not on the UpdateChannel whitelist`)
                        }
                    }
                }

                interaction.reply({ embeds: [WhEmbed] })

    		} else {
    			let ErrEm = new EmbedBuilder()
    			.setColor('#1d1900')
    			.setDescription('<:Error:1050735184754003978> Just **Owner** And **ExtraOwner** Can use This Command*!*')

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