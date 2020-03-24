const Command = require('../_Command');


class Pause extends Command {
    name = 'pause';
    description = 'Pause a current playing video';

    async execute () {
        // TODO
    }
}

module.exports = new Pause();
