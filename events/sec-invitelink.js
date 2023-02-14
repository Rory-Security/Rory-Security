const { EmbedBuilder } = require('discord.js')
const CFG = require('../config.json')
const client = require('..')
const db = require('quick.db')

client.on('messageCreate', async message => {
    let Anti = await db.get(`guild_anti_invitelink_${message.guild.id}`)
    let Limit = await db.get(`guild_invitelinklimit_${message.guild.id}`)
    let LimitNum = await db.get(`limitnum_${message.guild.id}_${message.author.id}_invitelink`)
    let ExtraOwner = await db.get(`guild_extras_${message.guild.id}`)
    let WhiteList = await db.get(`guild_invitelink_whitelist_${message.guild.id}`)
    let FindLogs = await db.get(`guild_securitylogs_${message.guild.id}`)

    if(
        message.author.id == CFG.Smath || 
        message.author.id == CFG.Parzival ||
        message.author.id == message.guild.ownerId || 
        ExtraOwner && ExtraOwner.find((find) => find.user == message.author.id)
    )return ;

    if(message.content.includes('discord.gg/') || message.content.includes('https://discord.com/invite/')){
        if(Anti == 'ON'){            
            if(WhiteList && WhiteList.find((find) => find.user == message.author.id)){
                if(LimitNum >= Limit + 5){
                    db.delete(`limitnum_${message.guild.id}_${message.author.id}_invitelink`)
                    await message.member.timeout(120000).then(() => {
                        message.delete()
                        let TimeOutEmbeD = new EmbedBuilder()
                        .setColor('#adadad')
                        .setDescription(`<:InviteLink:1059061452851400706> **${message.author.tag}** Was 120sec TimedOut To Send **InviteLink**`)
                        message.channel.send({ embeds: [TimeOutEmbeD] })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:InviteLink:1059061452851400706> InviteLink')
                            .setColor('#adadad')
                            .setThumbnail(message.author.avatarURL())
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                            .setDescription(`**Punishment: Timeout 120sec**\n\n**Admin**\n__Username__ : ${message.author.username}\n__UserID__ : ${message.author.id}`)

                            message.guild.channels.cache.get(FindLogs).send({ content: `<@${message.author.id}>`, embeds: [LogsEmbeD] })
                        }
                    }).catch(() => {return })
                } else {
                    db.add(`limitnum_${message.guild.id}_${message.author.id}_invitelink`, 1)
                }
            } else {
                if(LimitNum >= Limit){
                    db.delete(`limitnum_${message.guild.id}_${message.author.id}_invitelink`)
                    await message.member.timeout(120000).then(() => {
                        message.delete()
                        let TimeOutEmbeD = new EmbedBuilder()
                        .setColor('#adadad')
                        .setDescription(`<:InviteLink:1059061452851400706> **${message.author.tag}** Was 120sec TimedOut To Send **InviteLink**`)
                        message.channel.send({ embeds: [TimeOutEmbeD] })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:InviteLink:1059061452851400706> InviteLink')
                            .setColor('#adadad')
                            .setThumbnail(message.author.avatarURL())
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                            .setDescription(`**Punishment: Timeout 120sec**\n\n**Admin**\n__Username__ : ${message.author.username}\n__UserID__ : ${message.author.id}`)

                            message.guild.channels.cache.get(FindLogs).send({ content: `<@${message.author.id}>`, embeds: [LogsEmbeD] })
                        }
                    }).catch(() => {return })
                } else {
                    db.add(`limitnum_${message.guild.id}_${message.author.id}_invitelink`, 1)
                }
            }
        }
    }
})