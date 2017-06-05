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

        if(!process(client,content)){
            //TODO send to last group
        }


        if (content.startsWith('/join')) {
            const split = content.split(' ')
            if (split.length !== 2) {
                client.socket.write('Invalid syntax: /join <groupName|groupId>\n')
                return
            }
            const grp = isNaN(parseInt(split[1])) ?
                this.manager.getGroupByName(split[1].trim()) :
                this.manager.getGroupByIndex(parseInt(split[1]))
            if (grp === null) {
                client.socket.write('Non existing group, try /groups to list all groups\n')
                return
            }
            grp.addClient(client)

            client.socket.write(`Joined ${grp.name} group\n`)
        }


        else if (content.startsWith('/setname')) {
            const split = content.split(' ')
            if (split.length !== 2) {
                client.socket.write('Invalid syntax: /setname <yourName>\n')
                return
            }
            client.name = split[1].trim()
        }


        else if (content.startsWith('/leave')) {
            const split = content.split(' ')
            if (split.length !== 2) {
                client.socket.write('Invalid syntax: /leave <groupName|groupId>\n')
                return
            }
            const grp = isNaN(parseInt(split[1])) ?
                this.manager.getGroupByName(split[1].trim()) :
                this.manager.getGroupByIndex(parseInt(split[1]))
            if (grp === null) {
                client.socket.write('Non existing group, try /joined to list all joined groups\n')
                return
            }
            if (grp.removeClient(client))
                client.socket.write(`Leaved ${grp.name} group\n`)
            else
                client.socket.write(`You are not in ${grp.name} group\n`)
        }

        else if (content.startsWith('/create')) {
            const split = content.split(' ')
            if (split.length !== 2) {
                client.socket.write('Invalid syntax: /create <groupName>\n')
                return
            }
            const grp = this.manager.createGroup(split[1].trim())
            grp.addClient(client)
            client.socket.write(`You are now in ${grp.name} group\n`)
        }

        //message
        else if (content.startsWith('/')) {
            const grpId = content.split(' ')[0].substr(1)
            if (isNaN(parseInt(grpId))) {
                client.socket.write('Invalid syntax "/<groupId> <message>"\n')
                return
            }
            const grp = this.manager.getGroupByIndex(grpId)
            if (grp === null) {
                client.socket.write('Non existing group, try /joined command\n')
                return
            }
            if (!client.isInGroup(grp.name)) {
                client.socket.write(`You are not in ${grp.name} group\n`)
                return
            }
            grp.send(client, content.substr(2 + grpId.toString().length))
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