const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js')
const db = require('quick.db')
const CFG = require('../../config.json')

module.exports = {
	name: 'reset',
	description: 'Reset Guild Settings',
	cooldown: 600000,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {
        var ExtraOwners = await db.get(`guild_extras_${interaction.guild.id}`)
        if(interaction.channel.type == ChannelType.GuildText){

            if(
                interaction.user.id == interaction.guild.ownerId ||
                interaction.user.id == CFG.Smath ||
                interaction.user.id == CFG.Parzival ||
                ExtraOwners && ExtraOwners.find(a => a.user == interaction.user.id)
            ){

                let DelEmbeD = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setColor('#656565')
                .setDescription('After clicking on the button, all your server settings will be reset')

                let DelButtoN = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('DelButtonClick')
                    .setLabel('Sure')
                    .setStyle(ButtonStyle.Secondary)
                )

                interaction.reply({ embeds: [DelEmbeD], components: [DelButtoN], ephemeral: true })

                const collector = interaction.channel.createMessageComponentCollector();
                collector.on('collect', async int => {
                    if(int.customId == 'DelButtonClick'){
                        db.all().forEach(Datas => {
                            if(Datas.ID.includes(interaction.guild.id)){
                                db.delete(Datas.ID)
                            }
                        })
                        let RestEnd = new EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                        .setColor('#adadad')
                        .setDescription('<:Done:1059410425013350440> Your server settings have been reset successfully')

                        await int.update({ embeds: [RestEnd], components: [] });
                    }
                })

            } else {
                let ErrEm = new EmbedBuilder()
                .setColor('#292929')
                .setDescription('<:Error:1059410435058708550> Just **Owner** And **ExtraOwner** Can use This Command*!*')

                interaction.reply({ embeds: [ErrEm], ephemeral: true })
            }
        } else {
            let CHEmbeD = new EmbedBuilder()
            .setColor('#292929')
            .setDescription('<:Error:1059410435058708550> Please use This Command in a Channel With Type **Text**')
            interaction.reply({ embeds: [CHEmbeD], ephemeral: true })
        }
	}
};