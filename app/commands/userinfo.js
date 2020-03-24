const Command = require('./_Command')

class UserInfo extends Command {
	name = 'userinfo';
	description = 'Get information about a user with @';
	
	execute(message) {
		const member = message.mentions.members.first()
		const user = member.user
		return message.channel.send(`Username: ${user.username}, ID: ${user.id}`)
	}
}

module.exports = new UserInfo()