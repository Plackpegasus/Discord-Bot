const discord = require('discord.js');
const TOKEN = require('./Token/TOKEN');

const Client = new discord.Client();

Client.on('ready', () => {
    console.log(`Bot Logged in as ${Client.user.tag}\n--------------------------------`)
})

Client.on('message', msg => {
    if (msg == 'ping') {
        msg.reply('pong');
    }
})

Client.login(TOKEN);
