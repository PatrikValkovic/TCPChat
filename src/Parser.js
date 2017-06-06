/**
 * 24.05.2017
 * TCP Chat using NodeJS
 * https://github.com/PatrikValkovic/TCPChat
 * Created by patri
 */
'use strict'

const net = require('net')
const log = require('./logger')
const manager = require('./groupManager')
const process = require('./commands')

/**
 * Parse user commands
 * @type {Parser}
 */
module.exports = class Parser {
    //TODO refactor

    /**
     * Constructor
     */
    constructor() {
        this.manager = manager
    }

    /**
     * Parse messages from user
     * @param {Client} client Client that send message
     * @param {string} content
     */
    parse(client, content) {

        log.info(`Obtain: ${content} from user ${client.id}`)

        if (!process(client, content)) {
            client.socket.write('Invalid syntax, try /help or more info')
            log.warning(`Cannot parse "${content}" from user ${client.id}`)
        }
    }
}