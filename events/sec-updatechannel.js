const { EmbedBuilder, AuditLogEvent } = require('discord.js')
const CFG = require('../config.json')
const client = require('..')
const db = require('quick.db')

client.on('channelUpdate', async function(oldChannel, newChannel) {
    let fetchedLogs = await newChannel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelUpdate,
    }).then(audit => audit.entries.first())
    if(!fetchedLogs)return

    let entry = fetchedLogs.executor
    let Anti = await db.get(`guild_anti_updatechannel_${newChannel.guild.id}`)
    let Recover = await db.get(`guild_repair_updatechannel_${newChannel.guild.id}`)
    let Limit = await db.get(`guild_updatechannellimit_${newChannel.guild.id}`)
    let LimitNum = await db.get(`limitnum_${newChannel.guild.id}_${entry.id}_updatechannel`)
    let ExtraOwner = await db.get(`guild_extras_${newChannel.guild.id}`)
    let WhiteList = await db.get(`guild_updatechannel_whitelist_${newChannel.guild.id}`)
    let FindLogs = await db.get(`guild_securitylogs_${newChannel.guild.id}`)
    let Punishment = await db.get(`guild_punishment_${newChannel.guild.id}`)
    let QuarantineRole = await db.get(`guild_quarantinerole_${newChannel.guild.id}`)

    if(
        entry.id == CFG.Smath ||
        entry.id == CFG.Parzival ||
        entry.id == client.user.id ||
        entry.id == newChannel.guild.ownerId ||
        ExtraOwner && ExtraOwner.find((find) => find.user == entry.id)
    )return ;

    if(Anti == 'ON'){
        if(WhiteList && WhiteList.find((find) => find.user == entry.id)){
            if(LimitNum >= Limit + 10){
                db.delete(`limitnum_${newChannel.guild.id}_${entry.id}_updatechannel`)
                if(Punishment == 'kick' || Punishment == null){
                    newChannel.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON'){
                            newChannel.edit({
                                name: oldChannel.name,
                                topic: oldChannel.topic,
                                nsfw: oldChannel.nsfw,
                                userLimit: oldChannel.userLimit,
                                rateLimitPerUser: oldChannel.rateLimitPerUser,
                                permissionOverwrites: oldChannel.permissionOverwrites.cache,
                                video_quality_mode: oldChannel.video_quality_mode
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateChannel:1059061231488598066> UpdateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newChannel.guild.name, iconURL: newChannel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${newChannel.name}\n__ID__ : ${newChannel.id}`)
    
                            newChannel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    newChannel.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nUpdateChannel' }).then(() => {

                        if(Recover == 'ON'){
                            newChannel.edit({
                                name: oldChannel.name,
                                topic: oldChannel.topic,
                                nsfw: oldChannel.nsfw,
                                userLimit: oldChannel.userLimit,
                                rateLimitPerUser: oldChannel.rateLimitPerUser,
                                permissionOverwrites: oldChannel.permissionOverwrites.cache,
                                video_quality_mode: oldChannel.video_quality_mode
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateChannel:1059061231488598066> UpdateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newChannel.guild.name, iconURL: newChannel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${newChannel.name}\n__ID__ : ${newChannel.id}`)
    
                            newChannel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    newChannel.guild.members.cache.get(entry.id).roles.remove(await newChannel.guild.roles.fetch()).then(() => {
                        newChannel.guild.members.cache.get(entry.id).roles.add(QuarantineRole)
                        if(Recover == 'ON'){
                            newChannel.edit({
                                name: oldChannel.name,
                                topic: oldChannel.topic,
                                nsfw: oldChannel.nsfw,
                                userLimit: oldChannel.userLimit,
                                rateLimitPerUser: oldChannel.rateLimitPerUser,
                                permissionOverwrites: oldChannel.permissionOverwrites.cache,
                                video_quality_mode: oldChannel.video_quality_mode
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateChannel:1059061231488598066> UpdateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newChannel.guild.name, iconURL: newChannel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${newChannel.name}\n__ID__ : ${newChannel.id}`)
    
                            newChannel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${newChannel.guild.id}_${entry.id}_updatechannel`, 1)
            }
        } else {
            if(LimitNum >= Limit + 1){
                db.delete(`limitnum_${newChannel.guild.id}_${entry.id}_updatechannel`)
                if(Punishment == 'kick' || Punishment == null){
                    newChannel.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON'){
                            newChannel.edit({
                                name: oldChannel.name,
                                topic: oldChannel.topic,
                                nsfw: oldChannel.nsfw,
                                userLimit: oldChannel.userLimit,
                                rateLimitPerUser: oldChannel.rateLimitPerUser,
                                permissionOverwrites: oldChannel.permissionOverwrites.cache,
                                video_quality_mode: oldChannel.video_quality_mode
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateChannel:1059061231488598066> UpdateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newChannel.guild.name, iconURL: newChannel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${newChannel.name}\n__ID__ : ${newChannel.id}`)
    
                            newChannel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    newChannel.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nUpdateChannel' }).then(() => {

                        if(Recover == 'ON'){
                            newChannel.edit({
                                name: oldChannel.name,
                                topic: oldChannel.topic,
                                nsfw: oldChannel.nsfw,
                                userLimit: oldChannel.userLimit,
                                rateLimitPerUser: oldChannel.rateLimitPerUser,
                                permissionOverwrites: oldChannel.permissionOverwrites.cache,
                                video_quality_mode: oldChannel.video_quality_mode
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateChannel:1059061231488598066> UpdateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newChannel.guild.name, iconURL: newChannel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${newChannel.name}\n__ID__ : ${newChannel.id}`)
    
                            newChannel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    newChannel.guild.members.cache.get(entry.id).roles.remove(await newChannel.guild.roles.fetch()).then(() => {
                        newChannel.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                        if(Recover == 'ON'){
                            newChannel.edit({
                                name: oldChannel.name,
                                topic: oldChannel.topic,
                                nsfw: oldChannel.nsfw,
                                userLimit: oldChannel.userLimit,
                                rateLimitPerUser: oldChannel.rateLimitPerUser,
                                permissionOverwrites: oldChannel.permissionOverwrites.cache,
                                video_quality_mode: oldChannel.video_quality_mode
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateChannel:1059061231488598066> UpdateChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newChannel.guild.name, iconURL: newChannel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${newChannel.name}\n__ID__ : ${newChannel.id}`)
    
                            newChannel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${newChannel.guild.id}_${entry.id}_updatechannel`, 1)
            }
        }
    }
})