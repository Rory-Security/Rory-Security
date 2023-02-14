const { EmbedBuilder, ApplicationCommandType, ChannelType } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'settings',
	description: "Guild Settings",
	cooldown: 30000,
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
                let settingembed = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setColor('#adadad')
                .setThumbnail(client.user.avatarURL())
                .setTitle('<:Setting:1060501383914201159> Guild Settings')

                    let punishment = await db.get(`guild_punishment_${interaction.guild.id}`)
                    let FindLogs = await db.get(`guild_securitylogs_${interaction.guild.id}`)

                    let antieveryonehere = await db.get(`guild_anti_everyonehere_${interaction.guild.id}`)
                    let antiinvitelink = await db.get(`guild_anti_invitelink_${interaction.guild.id}`)
                    let antiaddbot = await db.get(`guild_anti_addbot_${interaction.guild.id}`)
                    let antikickmember = await db.get(`guild_anti_kickmember_${interaction.guild.id}`)
                    let antibanmember = await db.get(`guild_anti_banmember_${interaction.guild.id}`)
                    let anticreaterole = await db.get(`guild_anti_createrole_${interaction.guild.id}`)
                    let antideleterole = await db.get(`guild_anti_deleterole_${interaction.guild.id}`)
                    let antiupdaterole = await db.get(`guild_anti_updaterole_${interaction.guild.id}`)
                    let anticreatechannel = await db.get(`guild_anti_createchannel_${interaction.guild.id}`)
                    let antideletechannel = await db.get(`guild_anti_deletechannel_${interaction.guild.id}`)
                    let antiupdatechannel = await db.get(`guild_anti_updatechannel_${interaction.guild.id}`)

                    let repaircreaterole = await db.get(`guild_repair_createrole_${interaction.guild.id}`)
                    let repairdeleterole = await db.get(`guild_repair_deleterole_${interaction.guild.id}`)
                    let repairupdaterole = await db.get(`guild_repair_updaterole_${interaction.guild.id}`)
                    let repaircreatechannel = await db.get(`guild_repair_createchannel_${interaction.guild.id}`)
                    let repairdeletechannel = await db.get(`guild_repair_deletechannel_${interaction.guild.id}`)
                    let repairupdatechannel = await db.get(`guild_repair_updatechannel_${interaction.guild.id}`)

                    let limiteveryonehere = await db.get(`guild_everyoneherelimit_${interaction.guild.id}`)
                    let limitinvitelink = await db.get(`guild_invitelinklimit_${interaction.guild.id}`)
                    let limitkick = await db.get(`guild_kicklimit_${interaction.guild.id}`)
                    let limitban = await db.get(`guild_banlimitlimit_${interaction.guild.id}`)
                    let limitcreaterole = await db.get(`guild_createrolelimit_${interaction.guild.id}`)
                    let limitdeleterole = await db.get(`guild_deleterolelimit_${interaction.guild.id}`)
                    let limitupdaterole = await db.get(`guild_updaterolelimit_${interaction.guild.id}`)
                    let limitcreatechannel = await db.get(`guild_createchannellimit_${interaction.guild.id}`)
                    let limitdeletechannel = await db.get(`guild_deletechannellimit_${interaction.guild.id}`)
                    let limitupdatechannel = await db.get(`guild_updatechannellimit_${interaction.guild.id}`)




                settingembed.setDescription(`Punishment : **${punishment || 'kick'}**\nSecurityLogs : **<#${FindLogs || '123456789'}>**`)
                settingembed.addFields(
                    { name: '<:BotAdd:1059061527405133904> AddBot', value: `Turn: ${antiaddbot || 'OFF'}`, inline: true},
                    { name: '<:everyonehere:1059061445268082748> @everyone/@here', value: `Turn: ${antieveryonehere || 'OFF'}\nLimit: ${limiteveryonehere || '0'}`, inline: true},
                    { name: '<:InviteLink:1059061452851400706> InviteLink', value: `Turn: ${antiinvitelink || 'OFF'} \nLimit: ${limitinvitelink || '0'}`, inline: true},
                    { name: '<:KickBan:1059061534048919562> KickMember', value: `Turn: ${antikickmember || 'OFF'} \nLimit: ${limitkick || '0'}`, inline: true},
                    { name: '<:KickBan:1059061534048919562> BanMember', value: `Turn: ${antibanmember || 'OFF'} \nLimit: ${limitban || '0'}`, inline: true},
                    { name: '<:CreateRole:1059061288505987113> CreateRole', value: `Turn: ${anticreaterole || 'OFF'} \nRecover: ${repaircreaterole || 'OFF'} \nLimit: ${limitcreaterole || '0'} `, inline: true},
                    { name: '<:DeleteRole:1059061294935834626> DeleteRole', value: `Turn: ${antideleterole || 'OFF'} \nRecover: ${repairdeleterole || 'OFF'} \nLimit: ${limitdeleterole || '0'} `, inline: true},
                    { name: '<:UpdateRole:1059061304083623956> UpdateRole', value: `Turn: ${antiupdaterole || 'OFF'} \nRecover: ${repairupdaterole || 'OFF'} \nLimit: ${limitupdaterole || '0'} `, inline: true},
                    { name: '<:CreateChannel:1059061209388822529> CreateChannel', value: `Turn: ${anticreatechannel || 'OFF'} \nRecover: ${repaircreatechannel || 'OFF'} \nLimit: ${limitcreatechannel || '0'} `, inline: true},
                    { name: '<:DeleteChannel:1059061221988507689> DeleteChannel', value: `Turn: ${antideletechannel || 'OFF'} \nRecover: ${repairdeletechannel || 'OFF'} \nLimit: ${limitdeletechannel || '0'} `, inline: true},
                    { name: '<:UpdateChannel:1059061231488598066> UpdateChannel', value: `Turn: ${antiupdatechannel || 'OFF'} \nRecover: ${repairupdatechannel || 'OFF'} \nLimit: ${limitupdatechannel || '0'} `, inline: true},
                )


            interaction.reply({
                embeds: [settingembed]
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
