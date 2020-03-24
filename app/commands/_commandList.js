const fs = require('fs')

// commandfiles starting with '_' are excluded
const commandFiles = fs.readdirSync(__dirname).filter(file => !file.startsWith('_'));
var commands = new Map();

for (let file of commandFiles) {
    let command = require(`./${file}`)
    commands.set(command.name, command)
}

console.log('>> FOLLOWING COMMANDS ARE AVAILABLE: ')
commands.forEach(c => {console.log(c)})

module.exports = commands