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

        if (!process(client, content)) {
            //TODO send to last group
        }
        else {
            client.socket.write('HELP\n' +
                '/setname\t\t\tSet your name\n' +
                '/groups\t\t\t\tList of all groups\n' +
                '/joined\t\t\t\tList of groups, that you are joined in\n' +
                '/join <groupName|groupId>\tJoin group\n' +
                '/leave <groupName|groupId>\tLeave group\n' +
                '/create <groupname>\t\tCreate new group\n' +
                '/<groupId> <message>\t\tSend message into group\n')
        }
    }
}