const { EmbedBuilder } = require('discord.js')
const CFG = require('../config.json')
const client = require('..')
const db = require('quick.db')

client.on('messageCreate', async message => {
    let Anti = await db.get(`guild_anti_everyonehere_${message.guild.id}`)
    let Limit = await db.get(`guild_everyoneherelimit_${message.guild.id}`)
    let LimitNum = await db.get(`limitnum_${message.guild.id}_${message.author.id}_everyonehere`)
    let ExtraOwner = await db.get(`guild_extras_${message.guild.id}`)
    let WhiteList = await db.get(`guild_everyonehere_whitelist_${message.guild.id}`)
    let FindLogs = await db.get(`guild_securitylogs_${message.guild.id}`)

    if(message.content.includes('@everyone') || message.content.includes('@here')){
        if(Anti == 'ON'){
            if(
                message.author.id == CFG.Smath || 
                message.author.id == CFG.Parzival ||
                message.author.id == message.guild.ownerId || 
                ExtraOwner && ExtraOwner.find((find) => find.user == message.author.id)
            )return ;

            if(WhiteList && WhiteList.find((find) => find.user == message.author.id)){
                if(LimitNum >= Limit + 5){
                    db.delete(`limitnum_${message.guild.id}_${message.author.id}_everyonehere`)
                    await message.member.timeout(240000).then(() => {
                        let TimeOutEmbeD = new EmbedBuilder()
                        .setColor('#adadad')
                        .setDescription(`<:everyonehere:1059061445268082748> **${message.author.tag}** Was 240sec TimedOut To Send **@everyone/@here**`)
                        message.channel.send({ embeds: [TimeOutEmbeD] })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:everyonehere:1059061445268082748> EveryoneHere')
                            .setColor('#adadad')
                            .setThumbnail(message.author.avatarURL())
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                            .setDescription(`**Punishment: Timeout 240sec**\n\n**Admin**\n__Username__ : ${message.author.username}\n__UserID__ : ${message.author.id}`)

                            message.guild.channels.cache.get(FindLogs).send({ content: `${message.author.tag}`, embeds: [LogsEmbeD] })
                        }
                    }).catch(() => {return })
                } else {
                    db.add(`limitnum_${message.guild.id}_${message.author.id}_everyonehere`, 1)
                }
            } else {
                if(LimitNum >= Limit){
                    db.delete(`limitnum_${message.guild.id}_${message.author.id}_everyonehere`)
                    await message.member.timeout(240000).then(() => {
                        message.delete()
                        let TimeOutEmbeD = new EmbedBuilder()
                        .setColor('#adadad')
                        .setDescription(`<:everyonehere:1059061445268082748> **${message.author.tag}** Was 240sec TimedOut To Send **@everyone/@here**`)
                        message.channel.send({ embeds: [TimeOutEmbeD] })

                        if(FindLogs){
                            let LogsEmbeD = new EmbedBuilder()
                            .setTitle('<:everyonehere:1059061445268082748> EveryoneHere')
                            .setColor('#adadad')
                            .setThumbnail(message.author.avatarURL())
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                            .setDescription(`**Punishment: Timeout 240sec**\n\n**Admin**\nUsername : ${message.author.username}\nUserID : ${message.author.id}`)

                            message.guild.channels.cache.get(FindLogs).send({ content: `${message.author.tag}`, embeds: [LogsEmbeD] })
                        }
                    }).catch(() => {return })
                } else {
                    db.add(`limitnum_${message.guild.id}_${message.author.id}_everyonehere`, 1)
                }
            }
        }
    }
})