const { EmbedBuilder, AuditLogEvent } = require('discord.js')
const CFG = require('../config.json')
const client = require('..')
const db = require('quick.db')

client.on('channelCreate', async channel => {
    let fetchedLogs = await channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelCreate,
    }).then(audit => audit.entries.first())
    if(!fetchedLogs)return

    let entry = fetchedLogs.executor
    let Anti = await db.get(`guild_anti_createchannel_${channel.guild.id}`)
    let Recover = await db.get(`guild_repair_createchannel_${channel.guild.id}`)
    let Limit = await db.get(`guild_createchannellimit_${channel.guild.id}`)
    let LimitNum = await db.get(`limitnum_${channel.guild.id}_${entry.id}_createchannel`)
    let ExtraOwner = await db.get(`guild_extras_${channel.guild.id}`)
    let WhiteList = await db.get(`guild_createchannel_whitelist_${channel.guild.id}`)
    let FindLogs = await db.get(`guild_securitylogs_${channel.guild.id}`)
    let Punishment = await db.get(`guild_punishment_${channel.guild.id}`)
    let QuarantineRole = await db.get(`guild_quarantinerole_${channel.guild.id}`)

    if(Punishment == 'quarantine'){
        channel.permissionOverwrites.create(QuarantineRole, { ViewChannel: false }).catch(() => {return })
    }

    if(
        entry.id == CFG.Smath ||
        entry.id == CFG.Parzival ||
        entry.id == client.user.id ||
        entry.id == channel.guild.ownerId ||
        ExtraOwner && ExtraOwner.find((find) => find.user == entry.id)
    )return ;

    if(Anti == 'ON'){
        if(WhiteList && WhiteList.find((find) => find.user == entry.id)){
            if(LimitNum >= Limit + 10){
                db.delete(`limitnum_${channel.guild.id}_${entry.id}_createchannel`)
                if(Punishment == 'kick' || Punishment == null){
                    channel.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON')channel.delete().catch(() => {return })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:CreateChannel:1059061209388822529> CreateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    channel.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nCreateChannel' }).then(() => {

                        if(Recover == 'ON')channel.delete().catch(() => {return })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:CreateChannel:1059061209388822529> CreateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    channel.guild.members.cache.get(entry.id).roles.remove(await channel.guild.roles.fetch()).then(() => {
                        channel.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                        if(Recover == 'ON')channel.delete().catch(() => {return })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:CreateChannel:1059061209388822529> CreateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${channel.guild.id}_${entry.id}_createchannel`, 1)
            }
        } else {
            if(LimitNum >= Limit){
                db.delete(`limitnum_${channel.guild.id}_${entry.id}_createchannel`)
                if(Punishment == 'kick' || Punishment == null){
                    channel.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON')channel.delete().catch(() => {return })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:CreateChannel:1059061209388822529> CreateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    channel.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nCreateChannel' }).then(() => {

                        if(Recover == 'ON')channel.delete().catch(() => {return })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:CreateChannel:1059061209388822529> CreateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    channel.guild.members.cache.get(entry.id).roles.remove(await channel.guild.roles.fetch()).then(() => {
                        channel.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                        if(Recover == 'ON')channel.delete().catch(() => {return })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:CreateChannel:1059061209388822529> CreateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${channel.guild.id}_${entry.id}_createchannel`, 1)
            }
        }
    }
})