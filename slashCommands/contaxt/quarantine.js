const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'quarantine',
	type: ApplicationCommandType.User,
	run: async (client, interaction) => {
        let entry = interaction.targetUser
        let ExtraOwner = await db.get(`guild_extras_${interaction.guild.id}`)
        let Punishment = await db.get(`guild_punishment_${interaction.guild.id}`)
        let QuarantineRole = await db.get(`guild_quarantinerole_${interaction.guild.id}`)
        let FindLogs = await db.get(`guild_securitylogs_${interaction.guild.id}`)

        if(interaction.user.id == CFG.Smath ||
            interaction.user.id == CFG.Parzival ||
            interaction.user.id == client.user.id ||
            interaction.user.id == interaction.guild.ownerId ||
            ExtraOwner && ExtraOwner.find((find) => find.user == interaction.user.id)
        ){

            if(Punishment != 'quarantine')return ;
                
            let QuarEmbed = new EmbedBuilder()
            .setColor('#adadad')
            .setTitle('Quarantine Add/Remove')
            .setDescription(`Click on Add Button to Quarantine <@${entry.id}>\n\n Click on Remove button to Remove <@${entry.id}> from quarantine`)

            let QuarButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('AddQuar')
                .setLabel('Add')
                .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                .setCustomId('RemoveQuar')
                .setLabel('Remove')
                .setStyle(ButtonStyle.Secondary)
            )

        interaction.reply({ embeds: [QuarEmbed], components: [QuarButtons], ephemeral: true })


    const collector = interaction.channel.createMessageComponentCollector();

    collector.on('collect', async i => {
        if(i.customId == 'AddQuar'){
            interaction.guild.members.cache.get(entry.id).roles.remove(await interaction.guild.roles.fetch()).then(() => {
                interaction.guild.members.cache.get(entry.id).roles.add(QuarantineRole)

                i.update({ content: `<:Done:1059410425013350440> <@${entry.id}> Was Added To Quarantine`, components: [] });

                if(FindLogs){
                    let LogEmbeD = new EmbedBuilder()
                    .setColor('#adadad')
                    .setDescription(`<@${interaction.user.id}> Was **Added** Quarantine To <@${entry.id}>`)

                    interaction.guild.channels.cache.get(FindLogs).send({ embeds: [LogEmbeD] })
                }
            })
        } else if(i.customId == 'RemoveQuar'){
            interaction.guild.members.cache.get(entry.id).roles.remove(QuarantineRole).then(() => {

    
                i.update({ content: `<:Done:1059410425013350440> <@${entry.id}> Was Removed To Quarantine`, components: [] });

                if(FindLogs){
                    let LogEmbeD = new EmbedBuilder()
                    .setColor('#adadad')
                    .setDescription(`<@${interaction.user.id}> Was **Removed** Quarantine To <@${entry.id}>`)

                    interaction.guild.channels.cache.get(FindLogs).send({ embeds: [LogEmbeD] })
                }
            })
        }
    });


        } else {
            let ErrEmbeD = new EmbedBuilder()
            .setColor('#292929')
            .setDescription('<:Error:1059410435058708550> Just **Owner** And **ExtraOwner** Can use This')

            interaction.reply({ embeds: [ErrEmbeD], ephemeral: true })
        }
    }
}