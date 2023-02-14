const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ChannelType } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'get',
	description: 'Show Guild Settings',
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'section',
            description: 'Select Section',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'ExtraOwners', value: 'EX' },
                { name: 'WhiteList Admins', value: 'WH' },
            ]
        }
    ],
	run: async (client, interaction) => {
        var section = interaction.options.get('section').value
        var ExtraOwners = await db.get(`guild_extras_${interaction.guild.id}`)
        if(interaction.channel.type == ChannelType.GuildText){
            if(
                interaction.user.id == interaction.guild.ownerId ||
                interaction.user.id == CFG.Smath ||
                interaction.user.id == CFG.Parzival ||
                ExtraOwners && ExtraOwners.find(a => a.user == interaction.user.id)
            ){

                let GetExtra = db.get(`guild_extras_${interaction.guild.id}`)

                let GetEvery = await db.get(`guild_everyonehere_whitelist_${interaction.guild.id}`)
                let GetGuildU  = await db.get(`guild_guildupdate_whitelist_${interaction.guild.id}`)
                let GetInviteL = await db.get(`guild_invitelink_whitelist_${interaction.guild.id}`)
                let GetAddB = await db.get(`guild_addbot_whitelist_${interaction.guild.id}`)
                let GetKickM = await db.get(`guild_kickmember_whitelist_${interaction.guild.id}`)
                let GetBanM = await db.get(`guild_banmember_whitelist_${interaction.guild.id}`)
                let GetCreateR = await db.get(`guild_createrole_whitelist_${interaction.guild.id}`)
                let GetDeleteR = await db.get(`guild_deleterole_whitelist_${interaction.guild.id}`)
                let GetUpdateR = await db.get(`guild_updaterole_whitelist_${interaction.guild.id}`)
                let GetCreateC = await db.get(`guild_createchannel_whitelist_${interaction.guild.id}`)
                let GetDeleteC = await db.get(`guild_deletechannel_whitelist_${interaction.guild.id}`)
                let GetUpdateC = await db.get(`guild_updatechannel_whitelist_${interaction.guild.id}`)

                let GetEmbed = new EmbedBuilder()
                GetEmbed.setColor('#adadad')

                if(section == 'EX'){
                    GetEmbed.setTitle('ExtraOwners: ')
                    if (GetExtra && GetExtra.length) {
                        let ExJoin = []
                        GetExtra.forEach(extrasu => {
                            ExJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.setDescription(ExJoin.join('\n'))
                    }
                } else if(section == 'WH'){
                    GetEmbed.setTitle('WhiteList Admins: ')
                    if (GetEvery && GetEvery.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:everyonehere:1059061445268082748> Everyone/Here Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetInviteL && GetInviteL.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:InviteLink:1059061452851400706> InviteLink Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetAddB && GetAddB.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:BotAdd:1059061527405133904> AddBot Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetKickM && GetKickM.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:KickBan:1059061534048919562> KickMember Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetBanM && GetBanM.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:KickBan:1059061534048919562> BanMember Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetCreateR && GetCreateR.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:CreateRole:1059061288505987113> CreateRole Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetDeleteR && GetDeleteR.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:DeleteRole:1059061294935834626> DeleteRole Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetUpdateR && GetUpdateR.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:UpdateRole:1059061304083623956> UpdateRole Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetCreateC && GetCreateC.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:CreateChannel:1059061209388822529> CreateChannel Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetDeleteC && GetDeleteC.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:DeleteChannel:1059061221988507689> DeleteChannel Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }
                    if (GetUpdateC && GetUpdateC.length) {
                        let WhJoin = []
                        GetExtra.forEach(extrasu => {
                            WhJoin.push(`<@${extrasu.user}>`)
                        })
                        GetEmbed.addFields(
                            { name: '<:UpdateChannel:1059061231488598066> UpdateChannel Whitelists', value: WhJoin.join('\n'), inline: true},
                        )
                        GetEmbed.setDescription(WhJoin.join('\n'))
                    }

                }

                interaction.reply({ embeds: [GetEmbed], ephemeral: true })
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