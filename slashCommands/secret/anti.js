const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'anti',
	description: "Turn ON/OFF Anti",
	cooldown: 60000,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {
        var ExtraOwners = await db.get(`guild_extras_${interaction.guild.id}`)
        if(interaction.channel.type == ChannelType.GuildText){

            if(
                interaction.user.id == interaction.guild.ownerId ||
                interaction.user.id == CFG.Smath ||
                interaction.user.id == CFG.Parzival ||
                ExtraOwners && ExtraOwners.find(a => a.user == interaction.user.id)
            ){

                let AntiEmbed = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setThumbnail(client.user.avatarURL())
                .setTitle('<:Setting:1060501383914201159> ' + client.user.username + ' Anti Turn')
                .setColor('#adadad')
                .setDescription(`To Turn Anti ON/OFF,
you can click on the selection menu and select the desired section


__**The important**__
that if Anti is ON, Anti will be OFF, and if Anti is OFF, it will be ON

**Anti default is OFF**`)

                let AntiMenu = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('TurningAntiMenu')
                        .setPlaceholder('Click Here. . .')
                        .addOptions(
                            {
                                label: 'Anti| @everyone @here',
                                description: 'Turn ON/OFF Anti everyone/here',
                                value: 'AntiEveryHere'
                            }, {
                                label: 'Anti| InviteLink',
                                description: 'Turn ON/OFF Anti InviteLink',
                                value: 'AntiInviteLink'
                            }, {
                                label: 'Anti| AddBot',
                                description: 'Turn ON/OFF Anti AddBot',
                                value: 'AntiAddBot'
                            }, {
                                label: 'Anti| KickMember',
                                description: 'Turn ON/OFF Anti KickMember',
                                value: 'AntiKickMember'
                            }, {
                                label: 'Anti| BanMember',
                                description: 'Turn ON/OFF Anti BanMember',
                                value: 'AntiBanMember'
                            }, {
                                label: 'Anti| CreateRole',
                                description: 'Turn ON/OFF Anti CreateRole',
                                value: 'AntiCreateRole'
                            }, {
                                label: 'Anti| DeleteRole',
                                description: 'Turn ON/OFF Anti DeleteRole',
                                value: 'AntiDeleteRole'
                            }, {
                                label: 'Anti| UpdateRole',
                                description: 'Turn ON/OFF Anti UpdateRole',
                                value: 'AntiUpdateRole'
                            }, {
                                label: 'Anti| CreateChannel',
                                description: 'Turn ON/OFF Anti CreateChannel',
                                value: 'AntiCreateChannel'
                            }, {
                                label: 'Anti| DeleteChannel',
                                description: 'Turn ON/OFF Anti DeleteChannel',
                                value: 'AntiDeleteChannel'
                            }, {
                                label: 'Anti| UpdateChannel',
                                description: 'Turn ON/OFF Anti UpdateChannel',
                                value: 'AntiUpdateChannel'
                            },
                        )
                    )
                interaction.reply({ embeds: [AntiEmbed], components: [AntiMenu], ephemeral: true })



                const collector = interaction.channel.createMessageComponentCollector();
                collector.on('collect', async int => {
                    let GetEvery = await db.get(`guild_anti_everyonehere_${interaction.guild.id}`)
                    let GetInviteL = await db.get(`guild_anti_invitelink_${interaction.guild.id}`)
                    let GetAddB = await db.get(`guild_anti_addbot_${interaction.guild.id}`)
                    let GetKickM = await db.get(`guild_anti_kickmember_${interaction.guild.id}`)
                    let GetBanM = await db.get(`guild_anti_banmember_${interaction.guild.id}`)
                    let GetCreateR = await db.get(`guild_anti_createrole_${interaction.guild.id}`)
                    let GetDeleteR = await db.get(`guild_anti_deleterole_${interaction.guild.id}`)
                    let GetUpdateR = await db.get(`guild_anti_updaterole_${interaction.guild.id}`)
                    let GetCreateC = await db.get(`guild_anti_createchannel_${interaction.guild.id}`)
                    let GetDeleteC = await db.get(`guild_anti_deletechannel_${interaction.guild.id}`)
                    let GetUpdateC = await db.get(`guild_anti_updatechannel_${interaction.guild.id}`)

                    let TurnEmbed = new EmbedBuilder()
                    if (int.values[0] === 'AntiEveryHere') {
                        if(GetEvery == 'OFF' || GetEvery == null){
                            db.set(`guild_anti_everyonehere_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **@everyone/@here** Was Successfully Turned **ON**')
                        } else if(GetEvery == 'ON'){
                            db.set(`guild_anti_everyonehere_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **@everyone/@here** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiInviteLink'){
                        if(GetInviteL == 'OFF' || GetInviteL == null){
                            db.set(`guild_anti_invitelink_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **InviteLink** Was Successfully Turned **ON**')
                        } else if(GetInviteL == 'ON'){
                            db.set(`guild_anti_invitelink_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **InviteLink** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiAddBot'){
                        if(GetAddB == 'OFF' || GetAddB == null){
                            db.set(`guild_anti_addbot_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **AddBot** Was Successfully Turned **ON**')
                        } else if(GetAddB == 'ON'){
                            db.set(`guild_anti_addbot_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **AddBot** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiKickMember'){
                        if(GetKickM == 'OFF' || GetKickM == null){
                            db.set(`guild_anti_kickmember_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **KickMember** Was Successfully Turned **ON**')
                        } else if(GetKickM == 'ON'){
                            db.set(`guild_anti_kickmember_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **KickMember** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiBanMember'){
                        if(GetBanM == 'OFF' || GetBanM == null){
                            db.set(`guild_anti_banmember_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **BanMember** Was Successfully Turned **ON**')
                        } else if(GetBanM == 'ON'){
                            db.set(`guild_anti_banmember_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **BanMember** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiCreateRole'){
                        if(GetCreateR == 'OFF' || GetCreateR == null){
                            db.set(`guild_anti_createrole_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **CreateRole** Was Successfully Turned **ON**')
                        } else if(GetCreateR == 'ON'){
                            db.set(`guild_anti_createrole_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **CreateRole** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiDeleteRole'){
                        if(GetDeleteR == 'OFF' || GetDeleteR == null){
                            db.set(`guild_anti_deleterole_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **DeleteRole** Was Successfully Turned **ON**')
                        } else if(GetDeleteR == 'ON'){
                            db.set(`guild_anti_deleterole_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **DeleteRole** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiUpdateRole'){
                        if(GetUpdateR == 'OFF' || GetUpdateR == null){
                            db.set(`guild_anti_updaterole_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **UpdateRole** Was Successfully Turned **ON**')
                        } else if(GetUpdateR == 'ON'){
                            db.set(`guild_anti_updaterole_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **UpdateRole** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiCreateChannel'){
                        if(GetCreateC == 'OFF' || GetCreateC == null){
                            db.set(`guild_anti_createchannel_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **CreateChannel** Was Successfully Turned **ON**')
                        } else if(GetCreateC == 'ON'){
                            db.set(`guild_anti_createchannel_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **CreateChannel** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiDeleteChannel'){
                        if(GetDeleteC == 'OFF' || GetDeleteC == null){
                            db.set(`guild_anti_deletechannel_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **DeleteChannel** Was Successfully Turned **ON**')
                        } else if(GetDeleteC == 'ON'){
                            db.set(`guild_anti_deletechannel_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **DeleteChannel** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    } else if(int.values[0] === 'AntiUpdateChannel'){
                        if(GetUpdateC == 'OFF' || GetUpdateC == null){
                            db.set(`guild_anti_updatechannel_${interaction.guild.id}`, 'ON')
                            TurnEmbed.setColor('#adadad')
                            TurnEmbed.setDescription('<:ON:1059410496962433024> Anti **UpdateChannel** Was Successfully Turned **ON**')
                        } else if(GetUpdateC == 'ON'){
                            db.set(`guild_anti_updatechannel_${interaction.guild.id}`, 'OFF')
                            TurnEmbed.setColor('#656565')
                            TurnEmbed.setDescription('<:OFF:1059410490125717514> Anti **UpdateChannel** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [TurnEmbed]})
                    }
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