module.exports = {
    name: 'kick',
    description: 'kick user with @',
    permission_level: 1, // for further implementation
    execute(message) {
        const member = message.mentions.members.first()

        if (!member) {
            return message.reply('You need to mention the user you want to kick')
        }

        if (!member.kickable) {
            return message.reply(`User ${member.user.tag} isn't kickable...`)
        }

        return member.kick()
        .then(() => message.reply(`${member.user.tag} was kicked`))
        .catch(error => {
            console.log(error)
            message.reply(`ERROR: Couldn't kick user ${member.user.tag}`)
        })
    }
}
