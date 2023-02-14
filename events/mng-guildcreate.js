const client = require('..')
const { EmbedBuilder } = require('discord.js')

client.on('guildCreate', async server => {
    if(server.memberCount < 40)return server.leave().then(() => { 
        let LEmbeD = new EmbedBuilder()
        .setColor('#656565')
        .setAuthor({ name: server.name, iconURL: server.iconURL() })
        .setDescription("<:Failed:1059410444634312714> Your server has less than 40 members, that's why I left your server")
        
        client.users.send(server.ownerId, { embeds: [LEmbeD] })
    });

    let JEmbeD = new EmbedBuilder()
    .setColor('#adadad')
    .setAuthor({ name: server.name, iconURL: server.iconURL() })
    .setTitle('<:BotAdd:1059061527405133904> Guild Join')
    .setDescription(`
GuildName: ${server.name} 
GuildID: ${server.id} 
GuildOwner: ${server.ownerId} 
GuildMembers: ${server.memberCount} 

ClientGuilds: ${client.guilds.cache.size}`)

    await client.channels.cache.get(require('../config.json').GuildLogs).send({ embeds: [JEmbeD] })
})