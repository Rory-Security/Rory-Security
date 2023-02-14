const client = require('..')
const db = require('quick.db')
const { EmbedBuilder } = require('discord.js');

client.on('guildDelete', async server => {
    if(server.memberCount < 40)return ;

    db.all().forEach(Datas => {
        if(Datas.ID.includes(server.id)){
            db.delete(Datas.ID)
        }
    })

    let LEmbeD = new EmbedBuilder()
    .setColor('#656565')
    .setAuthor({ name: server.name, iconURL: server.iconURL() })
    .setTitle('<:KickBan:1059061534048919562> Guild Left')
    .setDescription(`
GuildName: ${server.name}
GuildID: ${server.id} 
GuildOwner: ${server.ownerId} 
GuildMembers: ${server.memberCount} 

ClientGuilds: ${client.guilds.cache.size}`)

    await client.channels.cache.get(require('../config.json').GuildLogs).send({ embeds: [LEmbeD] })
})