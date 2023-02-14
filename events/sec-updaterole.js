const { EmbedBuilder, AuditLogEvent } = require('discord.js')
const CFG = require('../config.json')
const client = require('..')
const db = require('quick.db')

client.on('roleUpdate', async function(oldRole, newRole) {
    let fetchedLogs = await newRole.guild.fetchAuditLogs({
            type: AuditLogEvent.RoleUpdate,
    }).then(audit => audit.entries.first())
    if(!fetchedLogs)return

    let entry = fetchedLogs.executor
    let Anti = await db.get(`guild_anti_updaterole_${newRole.guild.id}`)
    let Recover = await db.get(`guild_repair_updaterole_${newRole.guild.id}`)
    let Limit = await db.get(`guild_updaterolelimit_${newRole.guild.id}`)
    let LimitNum = await db.get(`limitnum_${newRole.guild.id}_${entry.id}_updaterole`)
    let ExtraOwner = await db.get(`guild_extras_${newRole.guild.id}`)
    let WhiteList = await db.get(`guild_updaterole_whitelist_${newRole.guild.id}`)
    let FindLogs = await db.get(`guild_securitylogs_${newRole.guild.id}`)
    let Punishment = await db.get(`guild_punishment_${newRole.guild.id}`)
    let QuarantineRole = await db.get(`guild_quarantinerole_${newRole.guild.id}`)

    if(
        entry.id == CFG.Smath ||
        entry.id == CFG.Parzival ||
        entry.id == client.user.id ||
        entry.id == newRole.guild.ownerId ||
        ExtraOwner && ExtraOwner.find((find) => find.user == entry.id)
    )return ;

    if(Anti == 'ON'){
        if(WhiteList && WhiteList.find((find) => find.user == entry.id)){
            if(LimitNum >= Limit + 10){
                db.delete(`limitnum_${newRole.guild.id}_${entry.id}_updaterole`)
                if(Punishment == 'kick' || Punishment == null){
                    newRole.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON'){
                            newRole.edit({
                                name: oldRole.name,
                                color: oldRole.color,
                                icon: oldRole.icon,
                                position: oldRole.rawPosition,
                                permissions: oldRole.permissions,
                                mentionable: oldRole.mentionable,
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateRole:1059061304083623956> UpdateRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${oldRole.name}\n__ID__ : ${oldRole.id}`)
    
                            newRole.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    newRole.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nUpdateRole' }).then(() => {

                        
                        if(Recover == 'ON'){
                            newRole.edit({
                                name: oldRole.name,
                                color: oldRole.color,
                                icon: oldRole.icon,
                                position: oldRole.rawPosition,
                                permissions: oldRole.permissions,
                                mentionable: oldRole.mentionable,
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateRole:1059061304083623956> UpdateRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${oldRole.name}\n__ID__ : ${oldRole.id}`)
    
                            newRole.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    newRole.guild.members.cache.get(entry.id).roles.remove(await newRole.guild.roles.fetch()).then(() => {
                        newRole.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                        if(Recover == 'ON'){
                            newRole.edit({
                                name: oldRole.name,
                                color: oldRole.color,
                                icon: oldRole.icon,
                                position: oldRole.rawPosition,
                                permissions: oldRole.permissions,
                                mentionable: oldRole.mentionable,
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateRole:1059061304083623956> UpdateRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${oldRole.name}\n__ID__ : ${oldRole.id}`)
    
                            newRole.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${newRole.guild.id}_${entry.id}_updaterole`, 1)
            }
        } else {
            if(LimitNum >= Limit + 1){
                db.delete(`limitnum_${newRole.guild.id}_${entry.id}_updaterole`)
                if(Punishment == 'kick' || Punishment == null){
                    newRole.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON'){
                            newRole.edit({
                                name: oldRole.name,
                                color: oldRole.color,
                                icon: oldRole.icon,
                                position: oldRole.rawPosition,
                                permissions: oldRole.permissions,
                                mentionable: oldRole.mentionable,
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateRole:1059061304083623956> UpdateRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${oldRole.name}\n__ID__ : ${oldRole.id}`)
    
                            newRole.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    newRole.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nUpdateRole' }).then(() => {

                        
                        if(Recover == 'ON'){
                            newRole.edit({
                                name: oldRole.name,
                                color: oldRole.color,
                                icon: oldRole.icon,
                                position: oldRole.rawPosition,
                                permissions: oldRole.permissions,
                                mentionable: oldRole.mentionable,
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateRole:1059061304083623956> UpdateRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${oldRole.name}\n__ID__ : ${oldRole.id}`)
    
                            newRole.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    newRole.guild.members.cache.get(entry.id).roles.remove(await newRole.guild.roles.fetch()).then(() => {
                        newRole.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                        if(Recover == 'ON'){
                            newRole.edit({
                                name: oldRole.name,
                                color: oldRole.color,
                                icon: oldRole.icon,
                                position: oldRole.rawPosition,
                                permissions: oldRole.permissions,
                                mentionable: oldRole.mentionable,
                            }).catch(() => {return })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:UpdateRole:1059061304083623956> UpdateRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${oldRole.name}\n__ID__ : ${oldRole.id}`)
    
                            newRole.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${newRole.guild.id}_${entry.id}_updaterole`, 1)
            }
        }
    }
})