const Command = require('./_Command')
const { prefix } = require('../../config.json')

class Help extends Command {
    name = 'help';
    description = 'Stop it! Get some help...';

    execute(message) {
        let string = `Pi-Bot prefix: ${prefix}\n\nCommands with descriptions:\n----------------------------------`

        const commands = require('./_commandList')
        commands.forEach(command => {
            string += `\n${command.name}\t|\t${command.description}`
        })

        return message.channel.send(string)
    }
}

module.exports = new Help()