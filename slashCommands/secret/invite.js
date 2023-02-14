const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Invite RorySecurity To Your Servers',
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {
		const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;
		const embed = new EmbedBuilder()
		.setTitle('Invite Rory')
		.setDescription(`Invite the **RorySecurity** to your server. [Click here](${inviteUrl})`)
		.setColor('#adadad')
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({ text: client.user.tag })

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(inviteUrl)
			.setStyle(ButtonStyle.Link)
		])
		return interaction.reply({ embeds: [embed], components: [actionRow], ephemeral: true })
	}
};
