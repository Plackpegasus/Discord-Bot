const fs = require('fs');

module.exports = function (msg) {

    let log = 
    `${msg.author} as ${msg.author.username} in ${msg.channel.name}: '${msg}' \n`;

    fs.appendFile('./logs/chat logs.txt', log, (err) => {
        if (err) console.error(err);
    })
}
