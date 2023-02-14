const { EmbedBuilder, AuditLogEvent } = require('discord.js')
const CFG = require('../config.json')
const client = require('..')
const db = require('quick.db')

client.on('guildMemberRemove', async member => {
    let cn1 = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
    if (cn1.action == AuditLogEvent.MemberKick) {
        let cn2 = await member.guild.fetchAuditLogs({
                    type: AuditLogEvent.MemberKick
        }).then(audit => audit.entries.first())
        if(!cn1)return ;
        if(!cn2)return ;

        let entry = cn2.executor
        let Anti = await db.get(`guild_anti_kickmember_${member.guild.id}`)
        let Limit = await db.get(`guild_kicklimit_${member.guild.id}`)
        let LimitNum = await db.get(`limitnum_${member.guild.id}_${entry.id}_kickmember`)
        let ExtraOwner = await db.get(`guild_extras_${member.guild.id}`)
        let WhiteList = await db.get(`guild_kickmember_whitelist_${member.guild.id}`)
        let FindLogs = await db.get(`guild_securitylogs_${member.guild.id}`)
        let Punishment = await db.get(`guild_punishment_${member.guild.id}`)
        let QuarantineRole = await db.get(`guild_quarantinerole_${member.guild.id}`)

        if(
            entry.id == CFG.Smath ||
            entry.id == CFG.Parzival ||
            entry.id == client.user.id ||
            entry.id == member.guild.ownerId ||
            ExtraOwner && ExtraOwner.find((find) => find.user == entry.id)
        )return ;

        if(Anti == 'ON'){
            if(WhiteList && WhiteList.find((find) => find.user == entry.id)){
                if(LimitNum >= Limit + 10){
                    db.delete(`limitnum_${member.guild.id}_${entry.id}_kickmember`)
                    if(Punishment == 'kick' || Punishment == null){
                        member.guild.members.kick(entry.id).then(() => {

                            if(FindLogs){
                                let LogsEmbeD = new EmbedBuilder()
                                .setTitle('<:KickBan:1059061534048919562> KickMember')
                                .setColor('#adadad')
                                .setThumbnail(entry.avatarURL())
                                .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL() })
                                .setTimestamp()
                                .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Member**\n__Username__ : ${member.user.username}\n__UserID__ : ${member.user.id}`)
        
                                member.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                            }
                        }).catch(() => {return })
                    } else if(Punishment == 'ban'){
                        member.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nKickMember' }).then(() => {

                            if(FindLogs){
                                let LogsEmbeD = new EmbedBuilder()
                                .setTitle('<:KickBan:1059061534048919562> KickMember')
                                .setColor('#adadad')
                                .setThumbnail(entry.avatarURL())
                                .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL() })
                                .setTimestamp()
                                .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Member**\n__Username__ : ${member.user.username}\n__UserID__ : ${member.user.id}`)
        
                                member.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                            }
                        }).catch(() => {return })
                    } else if(Punishment == 'quarantine'){
                        member.guild.members.cache.get(entry.id).roles.remove(await member.guild.roles.fetch()).then(() => {
                            member.guild.members.cache.get(entry.id).roles.add(QuarantineRole)
                            
                            if(FindLogs){
                                let LogsEmbeD = new EmbedBuilder()
                                .setTitle('<:KickBan:1059061534048919562> KickMember')
                                .setColor('#adadad')
                                .setThumbnail(entry.avatarURL())
                                .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL() })
                                .setTimestamp()
                                .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Member**\n__Username__ : ${member.user.username}\n__UserID__ : ${member.user.id}`)
        
                                member.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                            }
                        }).catch(() => {return })
                    }
                } else {
                    db.add(`limitnum_${member.guild.id}_${entry.id}_kickmember`, 1)
                }
            } else {
                if(LimitNum >= Limit){
                    db.delete(`limitnum_${member.guild.id}_${entry.id}_kickmember`)
                    if(Punishment == 'kick' || Punishment == null){
                        member.guild.members.kick(entry.id).then(() => {

                            if(FindLogs){
                                let LogsEmbeD = new EmbedBuilder()
                                .setTitle('<:KickBan:1059061534048919562> KickMember')
                                .setColor('#adadad')
                                .setThumbnail(entry.avatarURL())
                                .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL() })
                                .setTimestamp()
                                .setDescription(`**Punishment: **Kick\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Member**\n__Username__ : ${member.user.username}\n__UserID__ : ${member.user.id}`)
        
                                member.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                            }
                        }).catch(() => {return })
                    } else if(Punishment == 'ban'){
                        member.guild.members.ban(entry.id, { reason: 'Banned by RorySecurity\nKickMember' }).then(() => {

                            if(FindLogs){
                                let LogsEmbeD = new EmbedBuilder()
                                .setTitle('<:KickBan:1059061534048919562> KickMember')
                                .setColor('#adadad')
                                .setThumbnail(entry.avatarURL())
                                .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL() })
                                .setTimestamp()
                                .setDescription(`**Punishment: **Ban\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Member**\n__Username__ : ${member.user.username}\n__UserID__ : ${member.user.id}`)
        
                                member.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>`, embeds: [LogsEmbeD] }) 
                            }
                        }).catch(() => {return })
                    } else if(Punishment == 'quarantine'){
                        member.guild.members.cache.get(entry.id).roles.remove(await member.guild.roles.fetch()).then(() => {
                            member.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                            if(FindLogs){
                                let LogsEmbeD = new EmbedBuilder()
                                .setTitle('<:KickBan:1059061534048919562> KickMember')
                                .setColor('#adadad')
                                .setThumbnail(entry.avatarURL())
                                .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL() })
                                .setTimestamp()
                                .setDescription(`**Punishment: **Quarantine\n\n**Admin**\n__Username__ : ${entry.username}\n__UserID__ : ${entry.id}\n\n**Member**\n__Username__ : ${member.user.username}\n__UserID__ : ${member.user.id}`)
        
                                member.guild.channels.cache.get(FindLogs).send({ content: `<@${entry.id}>/<@&${QuarantineRole}>`, embeds: [LogsEmbeD] }) 
                            }
                        }).catch(() => {return })
                    }
                } else {
                    db.add(`limitnum_${member.guild.id}_${entry.id}_kickmember`, 1)
                }
            }
        }
    }
})