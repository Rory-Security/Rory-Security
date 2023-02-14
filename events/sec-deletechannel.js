const { EmbedBuilder, AuditLogEvent } = require('discord.js')
const CFG = require('../config.json')
const client = require('..')
const db = require('quick.db')

client.on('channelDelete', async channel => {
    let fetchedLogs = await channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelDelete,
    }).then(audit => audit.entries.first())
    if(!fetchedLogs)return

    let entry = fetchedLogs.executor
    let Anti = await db.get(`guild_anti_deletechannel_${channel.guild.id}`)
    let Recover = await db.get(`guild_repair_deletechannel_${channel.guild.id}`)
    let Limit = await db.get(`guild_deletechannellimit_${channel.guild.id}`)
    let LimitNum = await db.get(`limitnum_${channel.guild.id}_${entry.id}_deletechannel`)
    let ExtraOwner = await db.get(`guild_extras_${channel.guild.id}`)
    let WhiteList = await db.get(`guild_deletechannel_whitelist_${channel.guild.id}`)
    let FindLogs = await db.get(`guild_securitylogs_${channel.guild.id}`)
    let Punishment = await db.get(`guild_punishment_${channel.guild.id}`)
    let QuarantineRole = await db.get(`guild_quarantinerole_${channel.guild.id}`)

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
                db.delete(`limitnum_${channel.guild.id}_${entry.id}_deletechannel`)
                if(Punishment == 'kick' || Punishment == null){
                    channel.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON'){
                            channel.guild.channels.create({
                                name: channel.name,
                                type: channel.type,
                                parent: channel.parent,
                                position: channel.rawPosition,
                                nsfw: channel.nsfw,
                                userLimit: channel.userLimit,
                                permissionOverwrites: channel.permissionOverwrites.cache.map(v => {
                                    let target =  channel.guild.roles.cache.get(v.id);
                                    if (!target) return;
                                    return {
                                        id: channel.guild.roles.cache.find(r => r.id === target.id),
                                        allow: v.allow,
                                        deny: v.deny
                                    };
                                }),
                            }).then(cc => {
                                cc.edit(
                                    {
                                      lockPermissions: channel.permissionsLocked,
                                      defaultAutoArchiveDuration: channel.defaultAutoArchiveDuration,
                                      rtcRegion: channel.rtcRegion,
                                      bitrate: channel.bitrate,
                                    }
                                );

                                if(channel.id == FindLogs){
                                    db.set(`guild_securitylogs_${channel.guild.id}`, cc.id)

                                    let LogsEmbeD = new EmbedBuilder()
                                    .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                                    .setColor('#adadad')
                                    .setThumbnail(entry.avatarURL())
                                    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                                    .setTimestamp()
                                    .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
            
                                    cc.send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                                }
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    channel.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nDeleteChannel' }).then(() => {
                        if(Recover == 'ON'){
                            channel.guild.channels.create({
                                name: channel.name,
                                type: channel.type,
                                parent: channel.parent,
                                position: channel.rawPosition,
                                nsfw: channel.nsfw,
                                userLimit: channel.userLimit,
                                permissionOverwrites: channel.permissionOverwrites.cache.map(v => {
                                    let target =  channel.guild.roles.cache.get(v.id);
                                    if (!target) return;
                                    return {
                                        id: channel.guild.roles.cache.find(r => r.id === target.id),
                                        allow: v.allow,
                                        deny: v.deny
                                    };
                                }),
                            }).then(cc => {
                                cc.edit(
                                    {
                                      lockPermissions: channel.permissionsLocked,
                                      defaultAutoArchiveDuration: channel.defaultAutoArchiveDuration,
                                      rtcRegion: channel.rtcRegion,
                                      bitrate: channel.bitrate,
                                    }
                                );

                                if(channel.id == FindLogs){
                                    db.set(`guild_securitylogs_${channel.guild.id}`, cc.id)

                                    let LogsEmbeD = new EmbedBuilder()
                                    .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                                    .setColor('#adadad')
                                    .setThumbnail(entry.avatarURL())
                                    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                                    .setTimestamp()
                                    .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
            
                                    cc.send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                                }
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    channel.guild.members.cache.get(entry.id).roles.remove(await channel.guild.roles.fetch()).then(() => {
                        if(Recover == 'ON'){
                            channel.guild.channels.create({
                                name: channel.name,
                                type: channel.type,
                                parent: channel.parent,
                                position: channel.rawPosition,
                                nsfw: channel.nsfw,
                                userLimit: channel.userLimit,
                                permissionOverwrites: channel.permissionOverwrites.cache.map(v => {
                                    let target =  channel.guild.roles.cache.get(v.id);
                                    if (!target) return;
                                    return {
                                        id: channel.guild.roles.cache.find(r => r.id === target.id),
                                        allow: v.allow,
                                        deny: v.deny
                                    };
                                }),
                            }).then(cc => {
                                cc.edit(
                                    {
                                      lockPermissions: channel.permissionsLocked,
                                      defaultAutoArchiveDuration: channel.defaultAutoArchiveDuration,
                                      rtcRegion: channel.rtcRegion,
                                      bitrate: channel.bitrate,
                                    }
                                );

                                if(channel.id == FindLogs){
                                    db.set(`guild_securitylogs_${channel.guild.id}`, cc.id)

                                    let LogsEmbeD = new EmbedBuilder()
                                    .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                                    .setColor('#adadad')
                                    .setThumbnail(entry.avatarURL())
                                    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                                    .setTimestamp()
                                    .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
            
                                    cc.send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                                }
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${channel.guild.id}_${entry.id}_deletechannel`, 1)
            }
        } else {
            if(LimitNum >= Limit){
                db.delete(`limitnum_${channel.guild.id}_${entry.id}_deletechannel`)
                if(Punishment == 'kick' || Punishment == null){
                    channel.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON'){
                            channel.guild.channels.create({
                                name: channel.name,
                                type: channel.type,
                                parent: channel.parent,
                                position: channel.rawPosition,
                                nsfw: channel.nsfw,
                                userLimit: channel.userLimit,
                                permissionOverwrites: channel.permissionOverwrites.cache.map(v => {
                                    let target =  channel.guild.roles.cache.get(v.id);
                                    if (!target) return;
                                    return {
                                        id: channel.guild.roles.cache.find(r => r.id === target.id),
                                        allow: v.allow,
                                        deny: v.deny
                                    };
                                }),
                            }).then(cc => {
                                cc.edit(
                                    {
                                      lockPermissions: channel.permissionsLocked,
                                      defaultAutoArchiveDuration: channel.defaultAutoArchiveDuration,
                                      rtcRegion: channel.rtcRegion,
                                      bitrate: channel.bitrate,
                                    }
                                );

                                if(channel.id == FindLogs){
                                    db.set(`guild_securitylogs_${channel.guild.id}`, cc.id)

                                    let LogsEmbeD = new EmbedBuilder()
                                    .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                                    .setColor('#adadad')
                                    .setThumbnail(entry.avatarURL())
                                    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                                    .setTimestamp()
                                    .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
            
                                    cc.send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                                }
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    channel.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nDeleteChannel' }).then(() => {
                        if(Recover == 'ON'){
                            channel.guild.channels.create({
                                name: channel.name,
                                type: channel.type,
                                parent: channel.parent,
                                position: channel.rawPosition,
                                nsfw: channel.nsfw,
                                userLimit: channel.userLimit,
                                permissionOverwrites: channel.permissionOverwrites.cache.map(v => {
                                    let target =  channel.guild.roles.cache.get(v.id);
                                    if (!target) return;
                                    return {
                                        id: channel.guild.roles.cache.find(r => r.id === target.id),
                                        allow: v.allow,
                                        deny: v.deny
                                    };
                                }),
                            }).then(cc => {
                                cc.edit(
                                    {
                                      lockPermissions: channel.permissionsLocked,
                                      defaultAutoArchiveDuration: channel.defaultAutoArchiveDuration,
                                      rtcRegion: channel.rtcRegion,
                                      bitrate: channel.bitrate,
                                    }
                                );

                                if(channel.id == FindLogs){
                                    db.set(`guild_securitylogs_${channel.guild.id}`, cc.id)

                                    let LogsEmbeD = new EmbedBuilder()
                                    .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                                    .setColor('#adadad')
                                    .setThumbnail(entry.avatarURL())
                                    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                                    .setTimestamp()
                                    .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
            
                                    cc.send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                                }
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    channel.guild.members.cache.get(entry.id).roles.remove(await channel.guild.roles.fetch()).then(() => {
                        channel.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                        if(Recover == 'ON'){
                            channel.guild.channels.create({
                                name: channel.name,
                                type: channel.type,
                                parent: channel.parent,
                                position: channel.rawPosition,
                                nsfw: channel.nsfw,
                                userLimit: channel.userLimit,
                                permissionOverwrites: channel.permissionOverwrites.cache.map(v => {
                                    let target =  channel.guild.roles.cache.get(v.id);
                                    if (!target) return;
                                    return {
                                        id: channel.guild.roles.cache.find(r => r.id === target.id),
                                        allow: v.allow,
                                        deny: v.deny
                                    };
                                }),
                            }).then(cc => {
                                cc.edit(
                                    {
                                      lockPermissions: channel.permissionsLocked,
                                      defaultAutoArchiveDuration: channel.defaultAutoArchiveDuration,
                                      rtcRegion: channel.rtcRegion,
                                      bitrate: channel.bitrate,
                                    }
                                );

                                if(channel.id == FindLogs){
                                    db.set(`guild_securitylogs_${channel.guild.id}`, cc.id)

                                    let LogsEmbeD = new EmbedBuilder()
                                    .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                                    .setColor('#adadad')
                                    .setThumbnail(entry.avatarURL())
                                    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                                    .setTimestamp()
                                    .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
            
                                    cc.send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                                }
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteChannel:1059061221988507689> DeleteChannel')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Channel**\n__Name__ : ${channel.name}\n__ID__ : ${channel.id}`)
    
                            channel.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] })
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${channel.guild.id}_${entry.id}_deletechannel`, 1)
            }
        }
    }
})