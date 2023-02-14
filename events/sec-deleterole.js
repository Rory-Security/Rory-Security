const { EmbedBuilder, AuditLogEvent } = require('discord.js')
const CFG = require('../config.json')
const client = require('..')
const db = require('quick.db')

client.on('roleDelete', async role => {
    let fetchedLogs = await role.guild.fetchAuditLogs({
        type: AuditLogEvent.RoleDelete,
    }).then(audit => audit.entries.first())
    if(!fetchedLogs)return

    let entry = fetchedLogs.executor
    let Anti = await db.get(`guild_anti_deleterole_${role.guild.id}`)
    let Recover = await db.get(`guild_repair_deleterole_${role.guild.id}`)
    let Limit = await db.get(`guild_deleterolelimit_${role.guild.id}`)
    let LimitNum = await db.get(`limitnum_${role.guild.id}_${entry.id}_deleterole`)
    let ExtraOwner = await db.get(`guild_extras_${role.guild.id}`)
    let WhiteList = await db.get(`guild_deleterole_whitelist_${role.guild.id}`)
    let FindLogs = await db.get(`guild_securitylogs_${role.guild.id}`)
    let Punishment = await db.get(`guild_punishment_${role.guild.id}`)
    let QuarantineRole = await db.get(`guild_quarantinerole_${role.guild.id}`)

    if(
        entry.id == CFG.Smath ||
        entry.id == CFG.Parzival ||
        entry.id == client.user.id ||
        entry.id == role.guild.ownerId ||
        ExtraOwner && ExtraOwner.find((find) => find.user == entry.id)
    )return ;

    if(Anti == 'ON'){
        if(WhiteList && WhiteList.find((find) => find.user == entry.id)){
            if(LimitNum >= Limit + 10){
                db.delete(`limitnum_${role.guild.id}_${entry.id}_deleterole`)
                if(Punishment == 'kick' || Punishment == null){
                    role.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON'){
                            role.guild.roles.create({
                                name: role.name,
                                color: role.color,
                                icon: role.icon,
                                position: role.rawPosition,
                                permissions: role.permissions,
                                mentionable: role.mentionable,
                            })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteRole:1059061294935834626> DeleteRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${role.name}\n__ID__ : ${role.id}`)
    
                            role.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    role.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nDeleteRole' }).then(() => {

                        if(Recover == 'ON'){
                            role.guild.roles.create({
                                name: role.name,
                                color: role.color,
                                icon: role.icon,
                                position: role.rawPosition,
                                permissions: role.permissions,
                                mentionable: role.mentionable,
                            })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteRole:1059061294935834626> DeleteRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${role.name}\n__ID__ : ${role.id}`)
    
                            role.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    role.guild.members.cache.get(entry.id).roles.remove(await role.guild.roles.fetch()).then(() => {
                        role.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                        if(Recover == 'ON'){
                            role.guild.roles.create({
                                name: role.name,
                                color: role.color,
                                icon: role.icon,
                                position: role.rawPosition,
                                permissions: role.permissions,
                                mentionable: role.mentionable,
                            })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteRole:1059061294935834626> DeleteRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${role.name}\n__ID__ : ${role.id}`)
    
                            role.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else db.add(`limitnum_${role.guild.id}_${entry.id}_deleterole`, 1)
        } else {
            if(LimitNum >= Limit){
                db.delete(`limitnum_${role.guild.id}_${entry.id}_deleterole`)
                if(Punishment == 'kick' || Punishment == null){
                    role.guild.members.kick(entry.id).then(() => {

                        if(Recover == 'ON'){
                            role.guild.roles.create({
                                name: role.name,
                                color: role.color,
                                icon: role.icon,
                                position: role.rawPosition,
                                permissions: role.permissions,
                                mentionable: role.mentionable,
                            })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteRole:1059061294935834626> DeleteRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${role.name}\n__ID__ : ${role.id}`)
    
                            role.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'ban'){
                    role.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nDeleteRole' }).then(() => {

                        if(Recover == 'ON'){
                            role.guild.roles.create({
                                name: role.name,
                                color: role.color,
                                icon: role.icon,
                                position: role.rawPosition,
                                permissions: role.permissions,
                                mentionable: role.mentionable,
                            })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteRole:1059061294935834626> DeleteRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${role.name}\n__ID__ : ${role.id}`)
    
                            role.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                } else if(Punishment == 'quarantine'){
                    role.guild.members.cache.get(entry.id).roles.remove(await role.guild.roles.fetch()).then(() => {
                        role.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                        if(Recover == 'ON'){
                            role.guild.roles.create({
                                name: role.name,
                                color: role.color,
                                icon: role.icon,
                                position: role.rawPosition,
                                permissions: role.permissions,
                                mentionable: role.mentionable,
                            })
                        }

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:DeleteRole:1059061294935834626> DeleteRole')
                            .setColor('#adadad')
                            .setThumbnail(entry.avatarURL())
                            .setAuthor({ name: role.guild.name, iconURL: role.guild.iconURL() })
                            .setTimestamp()
                            .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Role**\n__Name__ : ${role.name}\n__ID__ : ${role.id}`)
    
                            role.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                        }
                    }).catch(() => {return })
                }
            } else {
                db.add(`limitnum_${role.guild.id}_${entry.id}_deleterole`, 1)
            }
        }
    }
})