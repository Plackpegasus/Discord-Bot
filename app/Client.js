const { Client, Collection } = require('discord.js')

module.exports = class extends Client {
    constructor(instanceNr, config) {
        super()

        this.commands = new Collection()
        this.queue = new Map()
        this.config = config

        this.instance = instanceNr
    }
}
