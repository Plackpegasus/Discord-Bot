const Client = require('./app/Client')
const { prefix, token } = require('./config.json')

console.log(`>> INITIATING BOT STARTING SEQUENCE...`)

const client = new Client(1)

client.commands = require('./app/commands/_commandList')

client.on('ready', () => {
    console.log(`>> Discord Client ${client.instance} ready`)
    console.log(`\nBot Logged in as ${client.user.tag}\n--------------------------------`)
})

client.on('message', async message => {

    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    var command = client.commands.get(commandName)

    if (!command) {
        message.channel.send(`Command "${commandName}" not specified! Type $help for command list.`)
        command = client.commands.get('help')
    }

    try {
        command.execute(message)
    } catch (error) {
        console.error(error)
        message.channel.send(`Whoopsie... Something went wrong OwO"`)
    }
})

client.login(token)
