const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'recover',
	description: "Turn ON/OFF Recover",
	cooldown: 5000,
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
                .setTitle('<:Setting:1060501383914201159> ' + client.user.username + ' Recover Turn')
                .setColor('#adadad')
                .setDescription(`To Turn Recover ON/OFF,
you can click on the selection menu and select the desired section


__**The important**__
if Recover is ON, Recover will be OFF, and if Recover is OFF, it will be ON

**Recover default is OFF**`)
                let AntiMenu = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                        .setCustomId('TurningRecoverMenu')
                        .setPlaceholder('Click Here. . .')
                        .addOptions(
                            {
                                label: 'Recover| CreateRole',
                                description: 'Turn ON/OFF Recover CreateRole',
                                value: 'RecoverCreateRole'
                            }, {
                                label: 'Recover| DeleteRole',
                                description: 'Turn ON/OFF Recover DeleteRole',
                                value: 'RecoverDeleteRole'
                            }, {
                                label: 'Recover| UpdateRole',
                                description: 'Turn ON/OFF Recover UpdateRole',
                                value: 'RecoverUpdateRole'
                            }, {
                                label: 'Recover| CreateChannel',
                                description: 'Turn ON/OFF Recover CreateChannel',
                                value: 'RecoverCreateChannel'
                            }, {
                                label: 'Recover| DeleteChannel',
                                description: 'Turn ON/OFF Recover DeleteChannel',
                                value: 'RecoverDeleteChannel'
                            }, {
                                label: 'Recover| UpdateChannel',
                                description: 'Turn ON/OFF Recover UpdateChannel',
                                value: 'RecoverUpdateChannel'
                            },
                        )
                    )
                interaction.reply({ embeds: [AntiEmbed], components: [AntiMenu], ephemeral: true })

            const collector = interaction.channel.createMessageComponentCollector();
            collector.on('collect', async int => {
                let GetGuildU = await db.get(`guild_repair_guildupdate_${interaction.guild.id}`)
                let GetCreateR = await db.get(`guild_repair_createrole_${interaction.guild.id}`)
                let GetDeleteR = await db.get(`guild_repair_deleterole_${interaction.guild.id}`)
                let GetUpdateR = await db.get(`guild_repair_updaterole_${interaction.guild.id}`)
                let GetCreateC = await db.get(`guild_repair_createchannel_${interaction.guild.id}`)
                let GetDeleteC = await db.get(`guild_repair_deletechannel_${interaction.guild.id}`)
                let GetUpdateC = await db.get(`guild_repair_updatechannel_${interaction.guild.id}`)

                let RecoverEmbeD = new EmbedBuilder()

                    if(int.values[0] === 'RecoverCreateRole'){
                        if(GetCreateR == 'OFF' || GetCreateR == null){
                            db.set(`guild_repair_createrole_${interaction.guild.id}`, 'ON')
                            RecoverEmbeD.setColor('#adadad')
                            RecoverEmbeD.setDescription('<:ON:1059410496962433024> Recover **Create Role** Was Successfully Turned **ON**')
                        } else if(GetCreateR == 'ON'){
                            db.set(`guild_repair_createrole_${interaction.guild.id}`, 'OFF')
                            RecoverEmbeD.setColor('#656565')
                            RecoverEmbeD.setDescription('<:OFF:1059410490125717514> Recover **Create Role** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [RecoverEmbeD]})
                    } else if(int.values[0] === 'RecoverDeleteRole'){
                        if(GetDeleteR == 'OFF' || GetDeleteR == null){
                            db.set(`guild_repair_deleterole_${interaction.guild.id}`, 'ON')
                            RecoverEmbeD.setColor('#adadad')
                            RecoverEmbeD.setDescription('<:ON:1059410496962433024> Recover **Delete Role** Was Successfully Turned **ON**')
                        } else if(GetDeleteR == 'ON'){
                            db.set(`guild_repair_deleterole_${interaction.guild.id}`, 'OFF')
                            RecoverEmbeD.setColor('#656565')
                            RecoverEmbeD.setDescription('<:OFF:1059410490125717514> Recover **Delete Role** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [RecoverEmbeD]})
                    } else if(int.values[0] === 'RecoverUpdateRole'){
                        if(GetUpdateR == 'OFF' || GetUpdateR == null){
                            db.set(`guild_repair_updaterole_${interaction.guild.id}`, 'ON')
                            RecoverEmbeD.setColor('#adadad')
                            RecoverEmbeD.setDescription('<:ON:1059410496962433024> Recover **Update Role** Was Successfully Turned **ON**')
                        } else if(GetUpdateR == 'ON'){
                            db.set(`guild_repair_updaterole_${interaction.guild.id}`, 'OFF')
                            RecoverEmbeD.setColor('#656565')
                            RecoverEmbeD.setDescription('<:OFF:1059410490125717514> Recover **Update Role** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [RecoverEmbeD]})
                    } else if(int.values[0] === 'RecoverCreateChannel'){
                        if(GetCreateC == 'OFF' || GetCreateC == null){
                            db.set(`guild_repair_createchannel_${interaction.guild.id}`, 'ON')
                            RecoverEmbeD.setColor('#adadad')
                            RecoverEmbeD.setDescription('<:ON:1059410496962433024> Recover **Create Channel** Was Successfully Turned **ON**')
                        } else if(GetCreateC == 'ON'){
                            db.set(`guild_repair_createchannel_${interaction.guild.id}`, 'OFF')
                            RecoverEmbeD.setColor('#656565')
                            RecoverEmbeD.setDescription('<:OFF:1059410490125717514> Recover **Create Channel** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [RecoverEmbeD]})
                    } else if(int.values[0] === 'RecoverDeleteChannel'){
                        if(GetDeleteC == 'OFF' || GetDeleteC == null){
                            db.set(`guild_repair_deletechannel_${interaction.guild.id}`, 'ON')
                            RecoverEmbeD.setColor('#adadad')
                            RecoverEmbeD.setDescription('<:ON:1059410496962433024> Recover **Delete Channel** Was Successfully Turned **ON**')
                        } else if(GetDeleteC == 'ON'){
                            db.set(`guild_repair_deletechannel_${interaction.guild.id}`, 'OFF')
                            RecoverEmbeD.setColor('#656565')
                            RecoverEmbeD.setDescription('<:OFF:1059410490125717514> Recover **Delete Channel** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [RecoverEmbeD]})
                    } else if(int.values[0] === 'RecoverUpdateChannel'){
                        if(GetUpdateC == 'OFF' || GetUpdateC == null){
                            db.set(`guild_repair_updatechannel_${interaction.guild.id}`, 'ON')
                            RecoverEmbeD.setColor('#adadad')
                            RecoverEmbeD.setDescription('<:ON:1059410496962433024> Recover **Update Channel** Was Successfully Turned **ON**')
                        } else if(GetUpdateC == 'ON'){
                            db.set(`guild_repair_updatechannel_${interaction.guild.id}`, 'OFF')
                            RecoverEmbeD.setColor('#656565')
                            RecoverEmbeD.setDescription('<:OFF:1059410490125717514> Recover **Update Channel** Was Successfully Turned **OFF**')
                        }
                        int.reply({ embeds: [RecoverEmbeD]})
                    }
                })

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