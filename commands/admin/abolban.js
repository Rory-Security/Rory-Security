const CFG = require('../../config.json')
const db = require('quick.db')

module.exports = {
	name: 'abolban',
	run: async (client, message) => {
		let user = message.mentions.users.first();

		if(message.author.id == CFG.Parzival){
			if(!user)message.reply('plees mention user🤭')
			message.guild.members.ban(user.id, { reason: 'By Smath' }).then(() => {
				message.delete()
			})
		} else if(message.author.id == CFG.Smath)message.reply('فاز گرفتیا😹')
	}
}