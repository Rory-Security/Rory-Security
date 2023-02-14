const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js')
const db = require('quick.db');
const CFG = require('../../config.json')

module.exports = {
	name: 'extraowner',
	description: "ADD/REMOVE User To ExtraOwner",
	type: ApplicationCommandType.ChatInput,
    cooldown: 5000,
    options: [
        {
            name: 'type',
            description: 'ADD/REMOVE',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'ADD', value: 'ad' },
                { name: 'REMOVE', value: 're' },
            ]
        }, {
            name: 'user',
            description: 'Mention User',
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
	run: async (client, interaction) => {
        var type = interaction.options.get('type').value
        var userAD = interaction.options.get('user').value

        if(
            interaction.user.id == interaction.guild.ownerId ||
            interaction.user.id == CFG.Smath ||
            interaction.user.id == CFG.Parzival
        ){
            if(type == 'ad'){
                let ErExtra = await db.get(`guild_extras_${interaction.guild.id}`)
                if (ErExtra && ErExtra.find(find => find.user == userAD)) {

                    let alreadyEm = new EmbedBuilder()
                    .setColor('#656565')
                    .setDescription(`<:Failed:1059410444634312714> <@${userAD}> Has Already Been Added to The ExtraOwners`)
    
                    return interaction.reply({
                        embeds: [alreadyEm],
                        ephemeral: true,
                    });
                }
                
                db.push(`guild_extras_${interaction.guild.id}`, {user: userAD})
    
                let addEm = new EmbedBuilder()
                .setColor('#adadad')
                .setDescription(`<:Done:1059410425013350440> <@${userAD}> Was Added to The ExtraOwners`)
    
                interaction.reply({
                    embeds: [addEm],
                });
            }else if(type == 're'){
                let ErExtra = await db.get(`guild_extras_${interaction.guild.id}`)
                if (ErExtra && ErExtra.find(x => x.user === userAD)) {
                    let data = ErExtra.find(x => x.user === userAD)
                    let value = ErExtra.indexOf(data)
                    delete ErExtra[value]
                    let exrmv = ErExtra.filter(filt => { return filt != null && filt != '' })
    
                    db.set(`guild_extras_${interaction.guild.id}`, exrmv)
    
                    let SeEM = new EmbedBuilder()
                    .setColor('#adadad')
                    .setDescription(`<:Done:1059410425013350440> <@${userAD}> Was Removed From The ExtraOwners`)
        
                    interaction.reply({ embeds: [SeEM] });
                } else {
                    let ErrEm = new EmbedBuilder()
                    .setColor('#656565')
                    .setDescription(`<:Failed:1059410444634312714> <@${userAD}> is not in the ExtraOwners`)
    
                    interaction.reply({ embeds: [ErrEm], ephemeral: true });
                }
            }
        } else {
            let ErrEm = new EmbedBuilder()
            .setColor('#1d1900')
            .setDescription('<:Error:1050735184754003978> Just **Owner** Can use This Command*!*')

            interaction.reply({ embeds: [ErrEm], ephemeral: true })
        }
	}
};